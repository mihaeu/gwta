import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class GainExchangeTokenOption extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		++currentPlayer.exchangeTokens
		return []
	}
}
