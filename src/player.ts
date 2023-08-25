import { Node } from "./nodes.js"

export default class Player {
	private readonly _name: string
	private _location: Node
	private turn: number = 0

	constructor(name: string, location: Node) {
		this._name = name
		this._location = location
	}

	get name(): string {
		return this._name
	}

	get location(): Node {
		return this._location
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
}
