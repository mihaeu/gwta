import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class ForfeitOption extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		console.log(`Player ${currentPlayer} chose to not take any action.`)
		return []
	}
}
