import { Card } from "../cards.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class DiscardCardOption extends Option {
	public readonly card: Card
	public readonly count: number

	constructor(card: Card, count: number = 1) {
		super()
		this.card = card
		this.count = count
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): void {
		new Array(this.count).forEach(() => currentPlayer.discardCard(this.card))
	}
}
