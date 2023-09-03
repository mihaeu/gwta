import { PlayerBuildingNode } from "../nodes.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

import { PlayerBuilding } from "../buildings/playerBuilding.js"

export class UpgradeBuildingOption extends Option {
	public readonly playerBuilding: PlayerBuilding
	public readonly location: PlayerBuildingNode

	constructor(playerBuilding: PlayerBuilding, location: PlayerBuildingNode) {
		super()
		this.playerBuilding = playerBuilding
		this.location = location
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const oldBuilding: PlayerBuilding = this.location.building()
		this.location.buildOrUpgradeBuilding(this.playerBuilding)
		const index = currentPlayer.availableBuildings.findIndex(
			(playerBuilding) => playerBuilding.constructor.name === this.playerBuilding.constructor.name,
		)
		currentPlayer.availableBuildings.splice(index, 1)
		currentPlayer.availableBuildings.push(oldBuilding)
		return []
	}
}
