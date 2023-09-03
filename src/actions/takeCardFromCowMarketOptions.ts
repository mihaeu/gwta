import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { TakeCardFromCowMarketOption } from "../options/takeCardFromCowMarketOption.js"

export class TakeCardFromCowMarketOptions extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return gameBoard.cowMarket.map((cowCard) => new TakeCardFromCowMarketOption(cowCard))
	}
}
