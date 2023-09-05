import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Building } from "../buildings/building.js"

export class GainCoinOption extends Option {
	public readonly amount: number

	constructor(amount: number, building?: Building) {
		super()
		this.amount = amount
		this._building = building
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.gainCoins(this.amount)
		console.log(`Player ${currentPlayer} gained ${this.amount} coins.`)
		return []
	}

	toString(): string {
		return `${super.toString()}(${this.amount})`
	}
}
