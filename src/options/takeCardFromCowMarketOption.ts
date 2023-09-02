import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { CowCard } from "../cards.js"

export class TakeCardFromCowMarketOption extends Option {
	constructor(private readonly cowCard: CowCard) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const index = gameBoard.cowMarket.findIndex((card) => this.cowCard.equals(card))
		currentPlayer.handCards.push(gameBoard.cowMarket[index])
		gameBoard.cowMarket.splice(index, 1)
		return []
	}
}
