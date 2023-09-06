import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"
import { ExhaustionCard } from "../cards.js"

export class AddExhaustionCardsToOtherPlayersOption extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		gameBoard.players.forEach((player) => {
			if (player.name !== currentPlayer.name) {
				player.discardedCards.push(new ExhaustionCard())
			}
		})
		return []
	}
}
