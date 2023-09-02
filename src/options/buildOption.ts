import { PlayerBuildingNode } from "../nodes.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

import { PlayerBuilding } from "../buildings/playerBuilding.js"

export class BuildOption extends Option {
	public readonly building: PlayerBuilding
	public readonly location: PlayerBuildingNode

	constructor(building: PlayerBuilding, location: PlayerBuildingNode) {
		super()
		this.building = building
		this.location = location
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		this.location.buildOrUpgradeBuilding(this.building)
		const index = currentPlayer.availableBuildings.findIndex(
			(playerBuilding) => playerBuilding.constructor.name === this.building.constructor.name,
		)
		currentPlayer.availableBuildings.splice(index, 1)
		return []
	}
}
