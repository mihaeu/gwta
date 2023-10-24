import { AnyCard, AnyCowCard, Card, CowCard } from "../cards.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { getAllCombinations } from "../util.js"
import { RemoveCardOption } from "../options/removeCardOption.js"
import { AllAsOneOption } from "../options/allAsOneOption.js"

export class RemoveCardOptions extends Option {
	constructor(
		private readonly card: Card = new AnyCard(),
		private readonly count: number = 1,
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		let cards: Card[]
		if (this.card instanceof AnyCowCard) {
			cards = currentPlayer.handCards.filter((card) => card instanceof CowCard)
		} else if (this.card instanceof AnyCard) {
			cards = currentPlayer.handCards
		} else {
			cards = currentPlayer.handCards.filter((card) => card.constructor.name === this.card.constructor.name)
		}

		if (this.count === 1) {
			return cards
				.reduce((uniqueCards: Card[], card) => {
					if (uniqueCards.some((uniqueCard) => uniqueCard instanceof CowCard && uniqueCard.equals(card as CowCard))) {
						return uniqueCards
					}
					uniqueCards.push(card)
					return uniqueCards
				}, new Array<Card>())
				.map((card: Card) => new RemoveCardOption(card))
		}

		return [
			...getAllCombinations(cards)
				.filter((combination) => combination.length === this.count)
				.reduce((map, cards) => {
					const key = cards.sort().toString()
					if (map.has(key)) {
						return map
					}
					map.set(key, cards.sort())
					return map
				}, new Map<string, Card[]>())
				.values(),
		].map((combination) => new AllAsOneOption(...combination.map((card) => new RemoveCardOption(card))))
	}
}
