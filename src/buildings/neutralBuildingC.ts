import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { NeutralBuilding } from "./neutralBuilding.js"
import { MoveTrainOptions } from "../actions/moveTrainOptions.js"
import { Option } from "../options/option.js"
import { DrawObjectiveCardOption } from "../options/drawObjectiveCardOption.js"

/**
 * Up to three available action:
 * 	- Draw a bonus card
 *  - Do a single auxiliary action
 *  - Move the train forward by one
 */
export class NeutralBuildingC extends NeutralBuilding {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = [new MoveTrainOptions(1)]

		if (gameBoard.objectiveCards.length > 0) {
			options.push(new DrawObjectiveCardOption())
		}

		return options
	}
}
