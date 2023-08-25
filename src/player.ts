import { Node } from "./nodes.js"
import { Tile } from "./tiles.js"

export default abstract class Player {
	protected readonly _name: string
	protected _location: Node
	protected turn: number = 0
	private _moveDistance: number = 3

	protected constructor(name: string, location: Node) {
		this._name = name
		this._location = location
	}

	get name(): string {
		return this._name
	}

	get location(): Node {
		return this._location
	}

	get moveDistance(): number {
		return this._moveDistance
	}

	set location(value: Node) {
		this._location = value
	}

	nextTurn() {
		++this.turn
	}

	turnsTaken(): number {
		return this.turn
	}

	abstract chooseMovement(locations: Node[]): number
	abstract chooseForesightTileA(tiles: Tile[]): number
	abstract chooseForesightTileB(tiles: Tile[]): number
	abstract chooseForesightTileC(tiles: Tile[]): number
}
