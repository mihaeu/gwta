import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { MoveOptions } from "../actions/moveOptions.js"
import { HireWorkerOptions } from "../actions/hireWorkerOptions.js"

export class PlayerBuilding9B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.BLACK
	public readonly requiredCarpenters: number = 7
	public readonly victoryPoints: number = 9

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		const hireWorkerOptions = new HireWorkerOptions(-4)
		return hireWorkerOptions.resolve(gameBoard, currentPlayer).length > 0 ? [hireWorkerOptions, new MoveOptions(5)] : [new MoveOptions(5)]
	}
}
