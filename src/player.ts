import { Node } from "./nodes.js"

export default class Player {
	private name: string
	private location?: Node
	private turn: number = 0

	constructor(name: string) {
		this.name = name
	}

	setLocation(location: Node) {
		this.location = location
	}

	nextTurn() {
		++this.turn
	}

	turnsTaken(): number {
		return this.turn
	}
}
