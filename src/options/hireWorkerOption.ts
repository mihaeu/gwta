import { TakenJobMarketSlot, Worker } from "../tiles.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class HireWorkerOption extends Option {
	constructor(
		private readonly worker: Worker,
		private readonly jobMarketIndex: number,
		private readonly cost: number,
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.pay(this.cost)
		gameBoard.jobMarket[this.jobMarketIndex] = new TakenJobMarketSlot()
		currentPlayer.hireWorker(this.worker)
		console.log(`Player ${currentPlayer} hired ${this.worker} for ${this.cost} coins.`)
		return []
	}

	toString(): string {
		return `${super.toString()}(${this.worker},${this.cost})`
	}
}
