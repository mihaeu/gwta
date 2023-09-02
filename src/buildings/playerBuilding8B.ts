import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"

export class PlayerBuilding8B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 5
	public readonly victoryPoints: number = 6

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
