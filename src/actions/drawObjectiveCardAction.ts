import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { Action } from "./action.js"
import { DrawObjectiveCardOption } from "../options/drawObjectiveCardOption.js"

export class DrawObjectiveCardAction extends Action {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return [new DrawObjectiveCardOption()]
	}
}
