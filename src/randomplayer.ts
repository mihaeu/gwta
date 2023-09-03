import { Node } from "./nodes.js"
import Player from "./player.js"
import { Card } from "./cards.js"
import { Option } from "./options/option.js"

import { PlayerBuilding } from "./buildings/playerBuilding.js"

export default class RandomPlayer extends Player {
	constructor(name: string, location: Node, cards: Card[], playerBuildings: PlayerBuilding[]) {
		super(name, location, cards, playerBuildings)
	}

	discardCards(count?: number): void {
		this._discardedCards = this._discardedCards.concat(
			this.handCards.splice(0, count && count <= this.handCards.length ? count : this.handCards.length),
		)
	}

	chooseOption(options: Option[]): Option {
		return options[Math.round(Math.random() * (options.length - 1))]
	}
}
