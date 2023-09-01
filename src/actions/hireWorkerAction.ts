import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { Worker } from "../tiles.js"
import { HireWorkerOption } from "../options/hireWorkerOption.js"
import { Action } from "./action.js"

export class HireWorkerAction extends Action {
	constructor(private readonly modifier: number = 0) {
		super()
	}

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const availableWorkers = gameBoard.availableWorkersWithCost()
		return availableWorkers.reduce((options, [worker, cost], index) => {
			if (cost + this.modifier <= currentPlayer.coins && worker instanceof Worker) {
				options.push(new HireWorkerOption(worker, index, cost + this.modifier))
			}
			return options
		}, new Array<Option>())
	}
}
