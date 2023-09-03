import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { MoveTrainOption } from "../options/moveTrainOption.js"

export class MoveTrainOptions extends Option {
	constructor(private readonly distance = 0) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const distance = this.distance !== 0 ? this.distance : currentPlayer.machinists.length
		const options = []
		for (let move = 1; move <= distance; ++move) {
			options.push(new MoveTrainOption(move))
		}
		return options
	}
}
