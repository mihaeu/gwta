import { Node } from "./nodes.js"
import { Tile } from "./tiles.js"
import { Card } from "./cards.js"
import arrayShuffle from "array-shuffle"

export default abstract class Player {
	protected readonly _name: string
	protected _location: Node
	protected turn: number = 0
	protected coins = 0
	private _moveDistance: number = 3
	public static readonly CARD_LIMIT = 4
	protected cards: Card[]
	protected handCards: Card[] = []
	protected discardedCards: Card[] = []

	protected constructor(name: string, location: Node, cards: Card[]) {
		this._name = name
		this._location = location
		this.cards = cards
	}

	get name(): string {
		return this._name
	}

	get location(): Node {
		return this._location
	}

	get moveDistance(): number {
		return this._moveDistance
	}

	set location(value: Node) {
		this._location = value
	}

	nextTurn() {
		++this.turn
	}

	turnsTaken(): number {
		return this.turn
	}

	gainCoins(amount: number) {
		this.coins += amount
	}

	drawCards(count: number) {
		if (this.cards.length < count) {
			const cardsLeft = count - this.cards.length
			this.handCards = this.handCards.concat(this.cards.splice(0, cardsLeft))
			this.cards = arrayShuffle(this.discardedCards)
			this.discardedCards = []
			this.handCards = this.handCards.concat(this.cards.splice(0, count - cardsLeft))
		} else {
			const cardsToDraw = this.cards.splice(0, count)
			this.handCards = this.handCards.concat(cardsToDraw)
		}
	}

	discardCardOrDrawToHandLimit(): void {
		if (this.handCards.length < Player.CARD_LIMIT) {
			this.drawCards(Player.CARD_LIMIT - this.handCards.length)
		}

		if (this.handCards.length > Player.CARD_LIMIT) {
			this.discardCards(this.handCards.length - Player.CARD_LIMIT)
		}
	}

	abstract chooseMovement(locations: Node[]): number
	abstract chooseForesightTileA(tiles: Tile[]): number
	abstract chooseForesightTileB(tiles: Tile[]): number
	abstract chooseForesightTileC(tiles: Tile[]): number
	abstract discardCards(count: number): void
}
