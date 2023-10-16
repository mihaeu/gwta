import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Node } from "../nodes.js"
import { Building } from "../buildings/building.js"

export class MoveOption extends Option {
	constructor(
		readonly location: Node,
		building?: Building,
	) {
		super()
		this._building = building
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const previousLocation = currentPlayer.location
		currentPlayer.location = this.location
		console.info(`Player ${currentPlayer.name} moved from ${previousLocation.constructor.name} to ${this.location.constructor.name}.`)
		return []
	}

	toString(): string {
		return `${super.toString()}(${this.location})`
	}
}
