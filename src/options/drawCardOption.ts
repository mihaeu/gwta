import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"

export class DrawCardOption extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.drawCards(1)
		console.log(`Player ${currentPlayer} drew 1 card and now has ${currentPlayer.handCards.length} on their hand.`)
		return []
	}
}
