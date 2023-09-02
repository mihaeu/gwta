import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { NeutralBuilding } from "./neutralBuilding.js"

export class NeutralBuildingF extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new AuxiliaryAction()]
	}
}
