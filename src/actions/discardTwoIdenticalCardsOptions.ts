import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { CowCard } from "../cards.js"
import { DiscardCardOption } from "../options/discardCardOption.js"
import { AllAsOneOption } from "../options/allAsOneOption.js"

export class DiscardTwoIdenticalCardsOptions extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.identicalCowCardsOnHand(currentPlayer).map(
			(card) => new AllAsOneOption(new DiscardCardOption(card), new DiscardCardOption(card)),
		)
	}

	hasOptions(gameBoard: GameBoard, currentPlayer: Player): boolean {
		return this.resolve(gameBoard, currentPlayer).length > 0
	}

	identicalCowCardsOnHand(player: Player): CowCard[] {
		const cowCardCount = player.handCards.reduce((map: Map<string, [number, CowCard]>, card) => {
			if (card instanceof CowCard) {
				if (!map.has(card.constructor.name)) {
					map.set(card.constructor.name, [1, card])
				} else {
					map.set(card.constructor.name, [map.get(card.constructor.name)![0] + 1, card])
				}
			}
			return map
		}, new Map<string, [number, CowCard]>())
		return [...cowCardCount.values()].filter(([count]) => count >= 2).map(([_, card]) => card)
	}
}
