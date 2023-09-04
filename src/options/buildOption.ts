import { PlayerBuildingNode } from "../nodes.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

import { PlayerBuilding } from "../buildings/playerBuilding.js"

export class BuildOption extends Option {
	public readonly playerBuilding: PlayerBuilding
	public readonly location: PlayerBuildingNode

	constructor(playerBuilding: PlayerBuilding, location: PlayerBuildingNode) {
		super()
		this.playerBuilding = playerBuilding
		this.location = location
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.pay(this.playerBuilding.requiredCarpenters * 2)

		this.location.buildOrUpgradeBuilding(this.playerBuilding)
		const index = currentPlayer.availableBuildings.findIndex(
			(playerBuilding) => playerBuilding.constructor.name === this.playerBuilding.constructor.name,
		)
		currentPlayer.availableBuildings.splice(index, 1)
		return []
	}

	toString(): string {
		const cost = this.playerBuilding.requiredCarpenters * 2
		return `${super.toString()}(${this.playerBuilding.constructor.name},${cost})`
	}
}
