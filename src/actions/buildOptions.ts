import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { BuildOption } from "../options/buildOption.js"
import { UpgradeBuildingOption } from "../options/upgradeBuildingOption.js"
import { Building } from "../buildings/building.js"

export class BuildOptions extends Option {
	constructor(building?: Building) {
		super()
		this._building = building
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = []
		const availableCarpenters = currentPlayer.carpenters.length
		const availableBuildings = currentPlayer.availableBuildings.filter(
			(building) => building.requiredCarpenters <= availableCarpenters && building.requiredCarpenters * 2 <= currentPlayer.coins,
		)
		for (const emptyLocation of gameBoard.emptyBuildingLocations()) {
			for (const availableBuilding of availableBuildings) {
				options.push(new BuildOption(availableBuilding, emptyLocation))
			}
		}
		for (const playerBuildingLocation of gameBoard.playerBuildings(currentPlayer)) {
			const existingBuilding = playerBuildingLocation.building()
			currentPlayer.availableBuildings
				.filter(
					(newBuilding) =>
						newBuilding.requiredCarpenters > existingBuilding.requiredCarpenters &&
						newBuilding.requiredCarpenters - existingBuilding.requiredCarpenters <= availableCarpenters &&
						2 * (newBuilding.requiredCarpenters - existingBuilding.requiredCarpenters) <= currentPlayer.coins,
				)
				.forEach((newBuilding) => options.push(new UpgradeBuildingOption(newBuilding, playerBuildingLocation)))
		}
		return options
	}
}
