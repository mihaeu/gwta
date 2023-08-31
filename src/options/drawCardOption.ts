import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"

export class DrawCardOption extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): void {
		currentPlayer.drawCards(1)
	}
}
