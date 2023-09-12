import { Node } from "./nodes.js"
import { Carpenter, Herder, Machinist, Worker } from "./tiles.js"
import { Card, ExhaustionCard, Fronterizo, HolandoArgentino, Niata, Patagonico } from "./cards.js"
import arrayShuffle from "array-shuffle"
import { Option } from "./options/option.js"

import { PlayerBuilding } from "./buildings/playerBuilding.js"
import { PlayerBuilding1A } from "./buildings/playerBuilding1A.js"
import { PlayerBuilding1B } from "./buildings/playerBuilding1B.js"
import { PlayerBuilding10B } from "./buildings/playerBuilding10B.js"
import { PlayerBuilding2A } from "./buildings/playerBuilding2A.js"
import { PlayerBuilding2B } from "./buildings/playerBuilding2B.js"
import { PlayerBuilding3A } from "./buildings/playerBuilding3A.js"
import { PlayerBuilding3B } from "./buildings/playerBuilding3B.js"
import { PlayerBuilding4A } from "./buildings/playerBuilding4A.js"
import { PlayerBuilding4B } from "./buildings/playerBuilding4B.js"
import { PlayerBuilding5A } from "./buildings/playerBuilding5A.js"
import { PlayerBuilding5B } from "./buildings/playerBuilding5B.js"
import { PlayerBuilding6A } from "./buildings/playerBuilding6A.js"
import { PlayerBuilding6B } from "./buildings/playerBuilding6B.js"
import { PlayerBuilding7A } from "./buildings/playerBuilding7A.js"
import { PlayerBuilding7B } from "./buildings/playerBuilding7B.js"
import { PlayerBuilding8A } from "./buildings/playerBuilding8A.js"
import { PlayerBuilding8B } from "./buildings/playerBuilding8B.js"
import { PlayerBuilding9A } from "./buildings/playerBuilding9A.js"
import { PlayerBuilding9B } from "./buildings/playerBuilding9B.js"
import { PlayerBuilding10A } from "./buildings/playerBuilding10A.js"
import { Farmer } from "./farmer.js"

export enum UpgradeType {
	BLACK = "BLACK",
	WHITE = "WHITE",
	UPGRADED = "UPGRADED",
}

export type Upgrades = {
	gainCoinDouble: UpgradeType
	drawAndDiscardCardDouble: UpgradeType
	grainForCertificateAndGoldSingle: UpgradeType
	grainForCertificateAndGoldDouble: UpgradeType
	goldForGrainSingle: UpgradeType
	goldForGrainDouble: UpgradeType
	goldForTrainSingle: UpgradeType
	goldForTrainDouble: UpgradeType
	revertTrainForCardRemovalSingle: UpgradeType
	revertTrainForCardRemovalDouble: UpgradeType
	movementUpgradeOne: UpgradeType
	movementUpgradeTwo: UpgradeType
	handLimitUpgradeOne: UpgradeType
	handLimitUpgradeTwo: UpgradeType
	certificateUpgrade: UpgradeType
	strengthUpgradeOne: UpgradeType
	strengthUpgradeTwo: UpgradeType
}

export default abstract class Player {
	private static readonly STARTING_CARD_LIMIT = 4
	public static readonly MAX_GRAIN = 8
	public static readonly STARTING_COINS = 7

	protected readonly _name: string
	protected _location: Node
	protected turn: number = 0
	private _coins = 0
	private _moveDistance: number = 3
	public cards: Card[]
	private _handCards: Card[] = []
	protected _discardedCards: Card[] = []
	protected _removedCards: Card[] = []
	private _herders: Worker[] = [new Herder()]
	private _carpenters: Worker[] = [new Carpenter()]
	private _machinists: Worker[] = [new Machinist()]
	private _farmers: Farmer[] = []
	public availableBuildings: PlayerBuilding[] = []
	private _grain = 0
	private _certificates = 0
	private _helpedFarmers: Farmer[] = []
	public exchangeTokens = 1
	private static readonly startCards = [
		new Niata(),
		new Niata(),
		new Niata(),
		new Niata(),
		new Niata(),
		new Patagonico(),
		new Patagonico(),
		new Patagonico(),
		new Fronterizo(),
		new Fronterizo(),
		new Fronterizo(),
		new HolandoArgentino(),
		new HolandoArgentino(),
		new HolandoArgentino(),
		new ExhaustionCard(),
	]

	public readonly upgrades: Upgrades = {
		gainCoinDouble: UpgradeType.WHITE,
		drawAndDiscardCardDouble: UpgradeType.WHITE,
		grainForCertificateAndGoldSingle: UpgradeType.WHITE,
		grainForCertificateAndGoldDouble: UpgradeType.WHITE,
		goldForGrainSingle: UpgradeType.WHITE,
		goldForGrainDouble: UpgradeType.WHITE,
		goldForTrainSingle: UpgradeType.WHITE,
		goldForTrainDouble: UpgradeType.WHITE,
		revertTrainForCardRemovalSingle: UpgradeType.WHITE,
		revertTrainForCardRemovalDouble: UpgradeType.WHITE,
		movementUpgradeOne: UpgradeType.BLACK,
		movementUpgradeTwo: UpgradeType.BLACK,
		handLimitUpgradeOne: UpgradeType.BLACK,
		handLimitUpgradeTwo: UpgradeType.BLACK,
		certificateUpgrade: UpgradeType.WHITE,
		strengthUpgradeOne: UpgradeType.WHITE,
		strengthUpgradeTwo: UpgradeType.BLACK,
	}

	protected constructor(name: string, location: Node) {
		this._name = name
		this._location = location
		this.cards = arrayShuffle(Player.startCards)
	}

	setStartBuildings(playerBuildings: number[]) {
		this.availableBuildings = [
			playerBuildings[0] ? new PlayerBuilding1A() : new PlayerBuilding1B(this),
			playerBuildings[1] ? new PlayerBuilding2A() : new PlayerBuilding2B(this),
			playerBuildings[2] ? new PlayerBuilding3A() : new PlayerBuilding3B(this),
			playerBuildings[3] ? new PlayerBuilding4A() : new PlayerBuilding4B(this),
			playerBuildings[4] ? new PlayerBuilding5A() : new PlayerBuilding5B(this),
			playerBuildings[5] ? new PlayerBuilding6A() : new PlayerBuilding6B(this),
			playerBuildings[6] ? new PlayerBuilding7A() : new PlayerBuilding7B(this),
			playerBuildings[7] ? new PlayerBuilding8A() : new PlayerBuilding8B(this),
			playerBuildings[8] ? new PlayerBuilding9A() : new PlayerBuilding9B(this),
			playerBuildings[9] ? new PlayerBuilding10A() : new PlayerBuilding10B(this),
		]
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

	get certificates(): number {
		return this._certificates
	}

	set certificates(value: number) {
		if (this._certificates + value > 4) {
			this._certificates = 4
		} else if (this._certificates + value < 0) {
			this._certificates = 0
		} else {
			this._certificates = value
		}
	}

	maxCertificates() {
		return 4
	}

	helpFarmer(farmer: Farmer) {
		this._helpedFarmers.push(farmer)
	}

	get helpedFarmers(): Farmer[] {
		return this._helpedFarmers
	}

	drawCards(count: number) {
		if (this.cards.length < count) {
			this.cards = this.cards.concat(arrayShuffle(this._discardedCards.splice(0, this._discardedCards.length)))
		}
		this._handCards = this._handCards.concat(this.cards.splice(0, count))
	}

	discardCard(card: Card) {
		const index = this.handCards.findIndex((currentCard) => currentCard.toString() === card.toString())
		if (index < 0) {
			throw new Error(`Player doesn't have card ${card} on their hand.`)
		}
		this.discardedCards.push(this.handCards.splice(index, 1)[0])
	}

	removeCard(card: Card) {
		const index = this.handCards.findIndex((currentCard) => currentCard.toString() === card.toString())
		if (index < 0) {
			throw new Error(`Player doesn't have card ${card} on their hand.`)
		}
		this._removedCards.push(this.handCards.splice(index, 1)[0])
	}

	hireWorker(worker: Worker | Farmer): void {
		if (worker instanceof Herder) {
			this.herders.push(worker)
		}

		if (worker instanceof Carpenter) {
			this.carpenters.push(worker)
		}

		if (worker instanceof Machinist) {
			this.machinists.push(worker)
		}

		if (worker instanceof Farmer) {
			this.farmers.push(worker)
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

	discardCards(): void {
		this._discardedCards = this._discardedCards.concat(this.handCards.splice(0, this.handCards.length))
	}

	strength(): number {
		const strengthFromFirstUpgrade = this.upgrades.strengthUpgradeOne === UpgradeType.UPGRADED ? 1 : 0
		const strengthFromSecondUpgrade = this.upgrades.strengthUpgradeTwo === UpgradeType.UPGRADED ? 2 : 0
		const strengthFromCarpenters = this._carpenters.filter((worker) => worker.strong).length
		const strengthFromHerders = this._herders.filter((worker) => worker.strong).length
		const strengthFromMachinists = this._machinists.filter((worker) => worker.strong).length
		return strengthFromFirstUpgrade + strengthFromSecondUpgrade + strengthFromCarpenters + strengthFromHerders + strengthFromMachinists
	}

	toString(): string {
		return this._name
	}

	equals(other: Player): boolean {
		return this._name === other._name
	}

	cardLimit(): number {
		if (this.upgrades.handLimitUpgradeOne === UpgradeType.UPGRADED && this.upgrades.handLimitUpgradeTwo === UpgradeType.UPGRADED) {
			return Player.STARTING_CARD_LIMIT + 2
		}

		if (this.upgrades.handLimitUpgradeOne === UpgradeType.UPGRADED || this.upgrades.handLimitUpgradeTwo === UpgradeType.UPGRADED) {
			return Player.STARTING_CARD_LIMIT + 1
		}

		return Player.STARTING_CARD_LIMIT
	}

	abstract chooseOption(options: Option[]): Promise<Option>
}
