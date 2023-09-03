import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { CompoundOption } from "../options/compoundOption.js"
import { Building } from "../buildings/building.js"

export class CostBenefitCombinedOptions extends Option {
	constructor(
		private readonly cost: Option,
		private readonly benefit: Option,
		building?: Building,
	) {
		super()
		this._building = building
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options = []
		for (const left of this.cost.resolve(gameBoard, currentPlayer)) {
			for (const right of this.benefit.resolve(gameBoard, currentPlayer)) {
				options.push(new CompoundOption(left, right))
			}
		}
		return options
	}
}
