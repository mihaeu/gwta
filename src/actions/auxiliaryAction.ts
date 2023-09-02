import { Action } from "./action.js"
import { Option } from "../options/option.js"
import Player from "../player.js"
import GameBoard from "../gameBoard.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { DrawCardOption } from "../options/drawCardOption.js"
import { FirstThanSecondsOption } from "../options/firstThanSecond.js"
import { DiscardCardAction } from "./discardCardAction.js"

export class AuxiliaryAction extends Action {
	/**
	 * TODO this is missing the check for available actions
	 */
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return [new FirstThanSecondsOption(new DrawCardOption(), new DiscardCardAction()), new GainCoinOption(1)]
	}
}
