import { Node } from "./nodes.js"
import { Tile } from "./tiles.js"
import Player from "./player.js"

export default class RandomPlayer extends Player {
	constructor(name: string, location: Node) {
		super(name, location)
	}

	chooseMovement(locations: Node[]): number {
		return Math.round(Math.random() * locations.length)
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
}
