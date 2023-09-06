import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { Franqueiro } from "../cards.js"
import { BuyCowOption } from "../options/buyCowOption.js"

export class FreeFranqueiroOptions extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return gameBoard.cowMarket.filter((cow) => cow instanceof Franqueiro).map((cow) => new BuyCowOption(cow, 0))
	}
}
