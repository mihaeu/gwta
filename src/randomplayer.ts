import { Node } from "./nodes.js"
import Player from "./player.js"
import { Card } from "./cards.js"
import { Option } from "./options/option.js"

import { PlayerBuilding } from "./buildings/playerBuilding.js"

export default class RandomPlayer extends Player {
	constructor(name: string, location: Node, cards: Card[], playerBuildings: PlayerBuilding[]) {
		super(name, location, cards, playerBuildings)
	}

	chooseOption(options: Option[]): Option {
		return options[Math.round(Math.random() * (options.length - 1))]
	}
}
