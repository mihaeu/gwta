import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { Worker } from "../tiles.js"
import { WorkerOption } from "../options/workerOption.js"
import { Action } from "./action.js"

export class HireWorkerAction extends Action {
	constructor(private readonly costModifier: number) {
		super()
	}

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const availableWorkers = gameBoard.jobMarket.filter((worker) => worker instanceof Worker) as Worker[]
		return availableWorkers.map((worker) => new WorkerOption(worker))
	}
}
