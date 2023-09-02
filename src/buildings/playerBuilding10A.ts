import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { GainGrainAction } from "../actions/gainGrainAction.js"
import { GainCoinAction } from "../actions/gainCoinAction.js"
import { MoveTrainAction } from "../actions/moveTrainAction.js"

export class PlayerBuilding10A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 9
	public readonly victoryPoints: number = 13

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return [new AuxiliaryAction()]
		}

		return [new AuxiliaryAction(), new GainGrainAction(5), new GainCoinAction(5), new MoveTrainAction(3)]
	}
}
