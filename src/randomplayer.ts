import { Node } from "./nodes.js"
import { Carpenter, Herder, Machinist, Tile, Worker } from "./tiles.js"
import Player from "./player.js"
import { Card } from "./cards.js"
import { Option } from "./options/option.js"
import { Action } from "./actions/action.js"

export default class RandomPlayer extends Player {
	constructor(name: string, location: Node, cards: Card[]) {
		super(name, location, cards)
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
		this.discardedCards = this.discardedCards.concat(
			this.handCards.splice(0, count && count <= this.handCards.length ? count : this.handCards.length),
		)
	}

	hireWorkers(availableWorkers: Worker[]): void {
		const chosenWorker = availableWorkers.splice(Math.round(Math.random() * (availableWorkers.length - 1)), 1).pop()! as Worker
		if (chosenWorker instanceof Herder) {
			this.herders.push(chosenWorker)
		}

		if (chosenWorker instanceof Carpenter) {
			this.carpenters.push(chosenWorker)
		}

		if (chosenWorker instanceof Machinist) {
			this.machinists.push(chosenWorker)
		}
	}

	chooseOption(options: Option[]): Option {
		return options[Math.round(Math.random() * (options.length - 1))]
	}

	chooseAction(actions: Action[]): Action {
		return actions[Math.round(Math.random() * (actions.length - 1))]
	}
}
