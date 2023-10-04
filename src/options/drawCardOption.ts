import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import * as console from "console"
import { pluralize } from "../util.js"

export class DrawCardOption extends Option {
	constructor(private readonly count: number = 1) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.drawCards(this.count)
		console.log(
			`Player ${currentPlayer} drew ${pluralize("card", this.count)} and now has ${currentPlayer.handCards.length} on their hand.`,
		)
		return []
	}
}
