import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { CompoundOption } from "../options/compoundOption.js"
import { Action } from "./action.js"

export class CostBenefitCombinedAction extends Action {
	constructor(
		private readonly cost: Action,
		private readonly benefit: Action,
	) {
		super()
	}

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options = []
		for (const left of this.cost.options(gameBoard, currentPlayer)) {
			for (const right of this.benefit.options(gameBoard, currentPlayer)) {
				options.push(new CompoundOption(left, right))
			}
		}
		return options
	}
}
