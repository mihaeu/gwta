import { BuildingNode } from "../nodes.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"
import { PlayerBuilding } from "../buildings/buildings.js"

export class UpgradeBuildingOption extends Option {
	public readonly building: PlayerBuilding
	public readonly location: BuildingNode

	constructor(building: PlayerBuilding, location: BuildingNode) {
		super()
		this.building = building
		this.location = location
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): void {
		const oldBuilding: PlayerBuilding = this.location.building as PlayerBuilding
		this.location.building = this.building
		const index = currentPlayer.availableBuildings.findIndex(
			(playerBuilding) => playerBuilding.constructor.name === this.building.constructor.name,
		)
		currentPlayer.availableBuildings.splice(index, 1)
		currentPlayer.availableBuildings.push(oldBuilding)
	}
}
