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
		const currentOption = this.options[0]
		currentOption.resolve(gameBoard, currentPlayer)

		const remainingOptions = this.options.slice(1)
		if (remainingOptions.length <= 1) {
			return remainingOptions
		}

		return [new OneByOneOption(...remainingOptions)]
	}

	toString(): string {
		return `${super.toString()}(${this.options.join()})`
	}
}
