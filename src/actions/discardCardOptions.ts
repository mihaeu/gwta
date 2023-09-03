import { AnyCard, AnyCowCard, Card, CowCard } from "../cards.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { DiscardCardOption } from "../options/discardCardOption.js"

export class DiscardCardOptions extends Option {
	constructor(private readonly card: Card = new AnyCard()) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.card instanceof AnyCowCard) {
			return currentPlayer.handCards
				.filter((card) => card instanceof CowCard)
				.reduce((uniqueCards: CowCard[], card) => {
					if (!uniqueCards.some((uniqueCard) => uniqueCard.equals(card as CowCard))) {
						uniqueCards.push(card as CowCard)
					}
					return uniqueCards
				}, new Array<CowCard>())
				.map((card) => new DiscardCardOption(card))
		}

		if (this.card instanceof AnyCard) {
			return currentPlayer.handCards
				.reduce((uniqueCards: CowCard[], card) => {
					if (card instanceof CowCard && !uniqueCards.some((uniqueCard) => uniqueCard.equals(card))) {
						uniqueCards.push(card)
					}
					return uniqueCards
				}, new Array<CowCard>())
				.map((card) => new DiscardCardOption(card))
		}

		return currentPlayer.handCards
			.filter((card) => card.constructor.name === this.card.constructor.name)
			.map((card) => new DiscardCardOption(card))
	}
}
