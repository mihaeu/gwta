import { Card } from "../cards.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class RemoveCardOption extends Option {
	public readonly card: Card
	public readonly count: number

	constructor(card: Card, count: number = 1) {
		super()
		this.card = card
		this.count = count
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		for (let i = 0; i < this.count; ++i) {
			currentPlayer.removeCard(this.card)
		}
		return []
	}

	toString(): string {
		return `${super.toString()}(${this.card.constructor.name})`
	}
}
