import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import * as console from "console"

export class DrawCardOption extends Option {
	constructor(private readonly count: number = 1) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.drawCards(this.count)
		console.log(
			`Player ${currentPlayer} drew ${this.count} card${this.count !== 1 ? "s" : ""} and now has ${
				currentPlayer.handCards.length
			} on their hand.`,
		)
		return []
	}
}
