import { Option } from "../options/option.js"
import Player from "../player.js"
import GameBoard from "../gameBoard.js"
import { GainCoinOption } from "../options/gainCoinOption.js"

export class DoubleAuxiliaryOptions extends Option {
	/**
	 * TODO this is missing the check for available actions
	 * TODO the current implementation of drawing and discarding means you are not able to discard the drawn card (maybe a follow up Action can be an option as well)
	 */
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return [new GainCoinOption(2)]
	}
}
