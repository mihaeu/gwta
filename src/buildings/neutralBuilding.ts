import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { Building } from "./building.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"

export enum BuildingHand {
	NONE = "NONE",
	BLACK = "BLACK",
	GREEN = "GREEN",
}

export class NeutralBuilding extends Building {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new AuxiliaryAction()]
	}
}
