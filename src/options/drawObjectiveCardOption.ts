import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class DrawObjectiveCardOption extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.putCardOnDiscardPile(gameBoard.objectiveCards.pop()!)
		return []
	}
}
