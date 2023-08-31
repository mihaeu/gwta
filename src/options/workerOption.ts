import { Worker } from "../tiles.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class WorkerOption extends Option {
	constructor(private readonly worker: Worker) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): void {
		// TODO
	}
}
