import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class CompoundOption extends Option {
	public readonly left: Option
	public readonly right: Option

	constructor(left: Option, right: Option) {
		super()
		this.left = left
		this.right = right
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): void {
		this.left.resolve(gameBoard, currentPlayer)
		this.right.resolve(gameBoard, currentPlayer)
	}
}
