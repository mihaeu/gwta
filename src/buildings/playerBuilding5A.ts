import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"

export class PlayerBuilding5A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 3
	public readonly victoryPoints: number = 4

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
