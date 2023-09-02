import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class DrawObjectiveCardOption extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): void {
		currentPlayer.putCardOnDiscardPile(gameBoard.objectiveCards.pop()!)
	}
}
