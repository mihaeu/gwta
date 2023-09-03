import { Option } from "../options/option.js"
import Player from "../player.js"
import GameBoard from "../gameBoard.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { DrawCardOption } from "../options/drawCardOption.js"
import { FirstThanSecondsOption } from "../options/firstThanSecondOption.js"
import { DiscardCardOptions } from "./discardCardOptions.js"
import { Building } from "../buildings/building.js"

export class AuxiliaryActionOptions extends Option {
	constructor(building?: Building) {
		super()
		this._building = building
	}

	/**
	 * TODO this is missing the check for available actions
	 */
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return [new FirstThanSecondsOption(new DrawCardOption(), new DiscardCardOptions()), new GainCoinOption(1)]
	}
}
