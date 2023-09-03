import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"

export abstract class Building {
	abstract options(gameBoard: GameBoard, currentPlayer: Player): Option[]
}
