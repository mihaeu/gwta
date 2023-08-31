import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { Action } from "./action.js"

export class GainCoinAction extends Action {
	constructor(private readonly coins: number) {
		super()
	}

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return [new GainCoinOption(this.coins)]
	}
}
