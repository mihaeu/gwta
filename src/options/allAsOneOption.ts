import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class AllAsOneOption extends Option {
	public readonly options: Option[]

	constructor(...options: Option[]) {
		super()
		this.options = options
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		this.options.forEach((option) => option.resolve(gameBoard, currentPlayer))
		return []
	}

	toString(): string {
		return `${super.toString()}(${this.options.join()})`
	}
}
