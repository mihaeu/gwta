import { Action } from "./action.js"
import { Option } from "../options/option.js"
import Player from "../player.js"
import GameBoard from "../gameBoard.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { CompoundOption } from "../options/compoundOption.js"
import { DiscardCardOption } from "../options/discardCardOption.js"
import { DrawCardOption } from "../options/drawCardOption.js"

export class AuxiliaryAction extends Action {
	/**
	 * TODO this is missing the check for available actions
	 * TODO the current implementation of drawing and discarding means you are not able to discard the drawn card (maybe a follow up Action can be an option as well)
	 */
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = currentPlayer.handCards.map((card) => new CompoundOption(new DrawCardOption(), new DiscardCardOption(card)))
		options.push(new GainCoinOption(1))
		return options
	}
}
