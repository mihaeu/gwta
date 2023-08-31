import { Card } from "../cards.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { DiscardCardOption } from "../options/discardCardOption.js"
import { Action } from "./action.js"

export class DiscardCardAction extends Action {
	constructor(private readonly card: Card) {
		super()
	}

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return currentPlayer.handCards
			.filter((card) => card.constructor.name === this.card.constructor.name)
			.map((card) => new DiscardCardOption(card))
	}
}