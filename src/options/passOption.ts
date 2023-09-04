import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class PassOption extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return []
	}
}
