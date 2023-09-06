import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"

export class GainGrainOption extends Option {
	public readonly amount: number

	constructor(amount: number) {
		super()
		this.amount = amount
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		this.amount > 0 ? currentPlayer.gainGrain(this.amount) : currentPlayer.useGrain(this.amount)
		console.log(`Player ${currentPlayer} ${this.amount > 0 ? "gained" : "used"} ${Math.abs(this.amount)} grain.`)
		return []
	}

	toString(): string {
		return `${super.toString()}(${this.amount})`
	}
}
