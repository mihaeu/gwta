import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class OneByOneOption extends Option {
	public readonly options: Option[]

	constructor(...options: Option[]) {
		super()
		this.options = options
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		this.options[0].resolve(gameBoard, currentPlayer)
		return this.options.length > 1 ? [new OneByOneOption(...this.options.slice(1))] : []
	}

	toString(): string {
		return `${super.toString()}(${this.options.join()})`
	}
}
