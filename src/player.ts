import { Node } from "./nodes.js"
import { Carpenter, Farmer, Herder, Machinist, Tile, Worker } from "./tiles.js"
import { Card } from "./cards.js"
import arrayShuffle from "array-shuffle"
import { Option } from "./options/option.js"

import { PlayerBuilding } from "./buildings/playerBuilding.js"

export default abstract class Player {
	public static readonly CARD_LIMIT = 4
	public static readonly MAX_GRAIN = 8
	public static readonly STARTING_COINS = 7

	protected readonly _name: string
	protected _location: Node
	protected turn: number = 0
	private _coins = 0
	private _moveDistance: number = 3
	protected cards: Card[]
	private _handCards: Card[] = []
	protected _discardedCards: Card[] = []
	private _herders: Worker[] = [new Herder()]
	private _carpenters: Worker[] = [new Carpenter()]
	private _machinists: Worker[] = [new Machinist()]
	private _farmers: Farmer[] = []
	public availableBuildings: PlayerBuilding[] = []
	private _grain = 0

	protected constructor(name: string, location: Node, cards: Card[], playerBuildings: PlayerBuilding[]) {
		this._name = name
		this._location = location
		this.cards = cards
		this.availableBuildings = playerBuildings
		this.availableBuildings.forEach((playerBuilding) => (playerBuilding.player = this))
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

	get farmers(): Farmer[] {
		return this._farmers
	}

	gainCoins(amount: number) {
		this._coins += amount
	}

	pay(amount: number) {
		this._coins -= amount
	}

	drawCards(count: number) {
		if (this.cards.length < count) {
			const cardsLeft = count - this.cards.length
			this._handCards = this._handCards.concat(this.cards.splice(0, cardsLeft))
			this.cards = arrayShuffle(this._discardedCards)
			this._discardedCards = []
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

	discardCard(card: Card) {
		const index = this.handCards.findIndex((currentCard) => currentCard == card)
		if (!index) {
			throw new Error(`Player doesn't have card ${card} on their hand.`)
		}
		this.handCards.splice(index, 1)
	}

	hireWorker(worker: Worker): void {
		if (worker instanceof Herder) {
			this.herders.push(worker)
		}

		if (worker instanceof Carpenter) {
			this.carpenters.push(worker)
		}

		if (worker instanceof Machinist) {
			this.machinists.push(worker)
		}
	}

	hasCardOfTypeInHand(card: Card): boolean {
		return this.handCards.some((handCard) => handCard.constructor.name === card.constructor.name)
	}

	get grain(): number {
		return this._grain
	}

	gainGrain(amount: number) {
		if (amount < 0) {
			throw new Error("Cannot gain negative grain")
		}

		this._grain = this._grain + amount >= 8 ? Player.MAX_GRAIN : this._grain + amount
	}

	useGrain(amount: number) {
		if (amount > this._grain) {
			throw new Error(`Cannot use more grain than available (${this._grain} < ${amount})`)
		}

		this._grain -= amount
	}

	putCardOnDiscardPile(card: Card) {
		this._discardedCards.push(card)
	}

	get discardedCards(): Card[] {
		return this._discardedCards
	}

	abstract chooseMovement(locations: Node[]): number
	abstract chooseForesightTileA(tiles: Tile[]): number
	abstract chooseForesightTileB(tiles: Tile[]): number
	abstract chooseForesightTileC(tiles: Tile[]): number
	abstract discardCards(count?: number): void
	abstract chooseOption(options: Option[]): Option
}
