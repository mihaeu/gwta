import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { DoubleAuxiliaryOptions } from "../actions/doubleAuxiliaryOptions.js"
import { MoveOptions } from "../actions/moveOptions.js"

export class PlayerBuilding2A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 1
	public readonly victoryPoints: number = 1

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		return [new DoubleAuxiliaryOptions(), new MoveOptions(1)]
	}
}
