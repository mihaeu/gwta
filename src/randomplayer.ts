import { Node } from "./nodes.js"
import { Tile } from "./tiles.js"
import Player from "./player.js"
import { Card } from "./cards.js"
import { Option } from "./options/option.js"
import { Action } from "./actions/action.js"

import { PlayerBuilding } from "./buildings/playerBuilding.js"

export default class RandomPlayer extends Player {
	constructor(name: string, location: Node, cards: Card[], playerBuildings: PlayerBuilding[]) {
		super(name, location, cards, playerBuildings)
	}

	chooseMovement(locations: Node[]): number {
		return Math.round(Math.random() * (locations.length - 1))
	}

	chooseForesightTileA(tiles: Tile[]): number {
		return Math.round(Math.random())
	}

	chooseForesightTileB(tiles: Tile[]): number {
		return Math.round(Math.random())
	}

	chooseForesightTileC(tiles: Tile[]): number {
		return Math.round(Math.random())
	}

	discardCards(count?: number): void {
		this._discardedCards = this._discardedCards.concat(
			this.handCards.splice(0, count && count <= this.handCards.length ? count : this.handCards.length),
		)
	}

	chooseOption(options: Option[]): Option {
		return options[Math.round(Math.random() * (options.length - 1))]
	}

	chooseAction(actions: Action[]): Action {
		return actions[Math.round(Math.random() * (actions.length - 1))]
	}
}
