import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"
import { DiscardCardOptions } from "../actions/discardCardOptions.js"
import { AnyCard } from "../cards.js"

export class UseExchangeTokenOption extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.exchangeTokens -= 1
		currentPlayer.drawCards(2)
		console.log(`Player ${currentPlayer} used one exchange token.`)
		return new DiscardCardOptions(new AnyCard(), 2).resolve(gameBoard, currentPlayer)
	}
}
