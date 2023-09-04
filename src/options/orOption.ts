import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class OrOption extends Option {
	constructor(
		private readonly either: Option,
		private readonly or: Option,
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return [this.either, this.or]
	}

	toString(): string {
		return `${super.toString()}(${this.either.toString()},${this.or.toString()})`
	}
}
