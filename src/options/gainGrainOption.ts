import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"

export class GainGrainOption extends Option {
	public readonly amount: number

	constructor(amount: number) {
		super()
		this.amount = amount
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): void {
		currentPlayer.gainGrain(this.amount)
	}
}