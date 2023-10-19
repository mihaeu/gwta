import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { PlayObjectiveCardOption } from "../options/playObjectiveCardOption.js"
import { ObjectiveCard } from "../objectiveCard.js"

export class PlayObjectiveCardOptions extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return currentPlayer.handCards
			.filter((card) => card instanceof ObjectiveCard)
			.map((objectiveCard) => new PlayObjectiveCardOption(objectiveCard as ObjectiveCard))
	}
}
