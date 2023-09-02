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

	resolve(gameBoard: GameBoard, currentPlayer: Player): void {
		currentPlayer.pay(this.cost)
		gameBoard.jobMarket[this.jobMarketIndex] = new TakenJobMarketSlot(currentPlayer)
		currentPlayer.hireWorker(this.worker)
	}
}