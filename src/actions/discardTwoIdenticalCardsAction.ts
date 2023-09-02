import { Action } from "./action.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { CowCard } from "../cards.js"
import { CompoundOption } from "../options/compoundOption.js"
import { DiscardCardOption } from "../options/discardCardOption.js"

export class DiscardTwoIdenticalCardsAction extends Action {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.identicalCowCardsOnHand(currentPlayer).map(
			(card) => new CompoundOption(new DiscardCardOption(card), new DiscardCardOption(card)),
		)
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
		return [...cowCardCount.values()].filter(([count, card]) => count >= 2).map(([count, card]) => card)
	}
}
