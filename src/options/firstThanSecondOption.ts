import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"

export class FirstThanSecondsOption extends Option {
	constructor(
		private readonly first: Option,
		private readonly second: Option,
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		this.first.resolve(gameBoard, currentPlayer)
		return this.second.resolve(gameBoard, currentPlayer)
	}
}
