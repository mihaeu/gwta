import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"

export class FirstThanSecondsOption extends Option {
	constructor(
		private readonly first: Option,
		private readonly second: Action,
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		this.first.resolve(gameBoard, currentPlayer)
		return this.second.options(gameBoard, currentPlayer)
	}
}
