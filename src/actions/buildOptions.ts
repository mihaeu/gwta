import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { BuildOption } from "../options/buildOption.js"
import { UpgradeBuildingOption } from "../options/upgradeBuildingOption.js"
import { Building } from "../buildings/building.js"

export class BuildOptions extends Option {
	constructor(
		private readonly costPerCarpenter: number = 2,
		building?: Building,
	) {
		super()
		this._building = building
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = []
		const availableCarpenters = currentPlayer.carpenters.length
		const availableBuildings = currentPlayer.availableBuildings.filter(
			(building) =>
				building.requiredCarpenters <= availableCarpenters && building.requiredCarpenters * this.costPerCarpenter <= currentPlayer.coins,
		)
		for (const emptyLocation of gameBoard.emptyBuildingLocations()) {
			for (const availableBuilding of availableBuildings) {
				options.push(new BuildOption(availableBuilding, emptyLocation, availableBuilding.requiredCarpenters * this.costPerCarpenter))
			}
		}
		for (const playerBuildingLocation of gameBoard.playerBuildings(currentPlayer)) {
			const existingBuilding = playerBuildingLocation.building()
			currentPlayer.availableBuildings
				.filter(
					(newBuilding) =>
						newBuilding.requiredCarpenters > existingBuilding.requiredCarpenters &&
						newBuilding.requiredCarpenters - existingBuilding.requiredCarpenters <= availableCarpenters &&
						this.costPerCarpenter * (newBuilding.requiredCarpenters - existingBuilding.requiredCarpenters) <= currentPlayer.coins,
				)
				.forEach((newBuilding) => {
					const cost = this.costPerCarpenter * (newBuilding.requiredCarpenters - existingBuilding.requiredCarpenters)
					options.push(new UpgradeBuildingOption(newBuilding, playerBuildingLocation, cost))
				})
		}
		return options
	}
}
