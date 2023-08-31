import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"

export abstract class Building {
	abstract actions(gameBoard: GameBoard, currentPlayer: Player): Action[]
}
