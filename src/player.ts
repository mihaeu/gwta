import { Node } from "./nodes.js"
import { Carpenter, Herder, Machinist, Tile, Worker } from "./tiles.js"
import { Card } from "./cards.js"
import arrayShuffle from "array-shuffle"

export default abstract class Player {
	protected readonly _name: string
	protected _location: Node
	protected turn: number = 0
	private _coins = 0
	private _moveDistance: number = 3
	public static readonly CARD_LIMIT = 4
	protected cards: Card[]
	private _handCards: Card[] = []
	protected discardedCards: Card[] = []
	private _herders: Worker[] = [new Herder()]
	private _carpenters: Worker[] = [new Carpenter()]
	private _machinists: Worker[] = [new Machinist()]
	private _farmers: Worker[] = []

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

	get handCards(): Card[] {
		return this._handCards
	}

	nextTurn() {
		++this.turn
	}

	turnsTaken(): number {
		return this.turn
	}

	get coins(): number {
		return this._coins
	}

	get herders(): Worker[] {
		return this._herders
	}

	get carpenters(): Worker[] {
		return this._carpenters
	}

	get machinists(): Worker[] {
		return this._machinists
	}

	get farmers(): Worker[] {
		return this._farmers
	}

	gainCoins(amount: number) {
		this._coins += amount
	}

	drawCards(count: number) {
		if (this.cards.length < count) {
			const cardsLeft = count - this.cards.length
			this._handCards = this._handCards.concat(this.cards.splice(0, cardsLeft))
			this.cards = arrayShuffle(this.discardedCards)
			this.discardedCards = []
			this._handCards = this._handCards.concat(this.cards.splice(0, count - cardsLeft))
		} else {
			const cardsToDraw = this.cards.splice(0, count)
			this._handCards = this._handCards.concat(cardsToDraw)
		}
	}

	discardCardOrDrawToHandLimit(): void {
		if (this._handCards.length < Player.CARD_LIMIT) {
			this.drawCards(Player.CARD_LIMIT - this._handCards.length)
		}

		if (this._handCards.length > Player.CARD_LIMIT) {
			this.discardCards(this._handCards.length - Player.CARD_LIMIT)
		}
	}

	abstract chooseMovement(locations: Node[]): number
	abstract chooseForesightTileA(tiles: Tile[]): number
	abstract chooseForesightTileB(tiles: Tile[]): number
	abstract chooseForesightTileC(tiles: Tile[]): number
	abstract discardCards(count?: number): void
	abstract hireWorkers(availableWorkers: Worker[]): void
}
