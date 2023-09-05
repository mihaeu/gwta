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

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		for (let i = 0; i < this.count; ++i) {
			currentPlayer.discardCard(this.card)
			console.log(`Player ${currentPlayer} discarded ${this.card} and now has ${currentPlayer.handCards.length} on their hand.`)
		}
		return []
	}

	toString(): string {
		return `${super.toString()}(${this.card.constructor.name})`
	}
}
