import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { NeutralBuilding } from "./neutralBuilding.js"
import { DoubleAuxiliaryAction } from "../actions/doubleAuxiliaryAction.js"
import { MoveTrainAction } from "../actions/moveTrainAction.js"

export class NeutralBuildingG extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new MoveTrainAction(), new DoubleAuxiliaryAction()]
	}
}
