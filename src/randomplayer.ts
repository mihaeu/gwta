import { Node } from "./nodes.js"
import { Tile } from "./tiles.js"
import Player from "./player.js"
import { Card } from "./cards.js"

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

	discardCards(count: number): void {
		this.discardedCards = this.discardedCards.concat(
			this.handCards.splice(0, count <= this.handCards.length ? count : this.handCards.length),
		)
	}
}
