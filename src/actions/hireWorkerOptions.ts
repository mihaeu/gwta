import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { Carpenter, Herder, Machinist, Worker } from "../tiles.js"
import { HireWorkerOption } from "../options/hireWorkerOption.js"
import { Building } from "../buildings/building.js"

export class HireWorkerOptions extends Option {
	constructor(
		private readonly modifier: number = 0,
		building?: Building,
	) {
		super()
		this._building = building
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const availableWorkers = gameBoard.availableWorkersWithCost()
		return availableWorkers.reduce((options, [worker, cost], index) => {
			if (cost + this.modifier <= currentPlayer.coins && worker instanceof Worker && this.isSpaceForWorker(worker, currentPlayer)) {
				options.push(new HireWorkerOption(worker, index, cost + this.modifier))
			}
			return options
		}, new Array<Option>())
	}

	private isSpaceForWorker(worker: Worker, currentPlayer: Player) {
		return worker instanceof Herder && currentPlayer.herders.length < 6
			? true
			: worker instanceof Machinist && currentPlayer.machinists.length < 6
			? true
			: worker instanceof Carpenter && currentPlayer.carpenters.length < 6
	}

	toString(): string {
		return `${super.toString()}(${this.modifier})`
	}
}
