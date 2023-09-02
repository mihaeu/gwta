import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"

export class DrawCardOption extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.drawCards(1)
		return []
	}
}
