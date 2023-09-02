import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "./action.js"
import { Option } from "../options/option.js"
import { TakeCardFromCowMarketOption } from "../options/takeCardFromCowMarketOption.js"

export class TakeCardFromCowMarketAction extends Action {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return gameBoard.cowMarket.map((cowCard) => new TakeCardFromCowMarketOption(cowCard))
	}
}
