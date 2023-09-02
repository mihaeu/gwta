import GameBoard from "../gameBoard.js"
import Player from "../player.js"

export abstract class Option {
	abstract resolve(gameBoard: GameBoard, currentPlayer: Player): Option[]
}
