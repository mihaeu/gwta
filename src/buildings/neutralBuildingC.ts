import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { NeutralBuilding } from "./buildings.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { DrawObjectiveCardAction } from "../actions/drawObjectiveCardAction.js"

/**
 * Up to three available action:
 * 	- Draw a bonus card
 *  - Do a single auxiliary action
 *  - Move the train forward by one
 */
export class NeutralBuildingC extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions: Action[] = [new AuxiliaryAction()]
		if (gameBoard.objectiveCards.length > 0) {
			actions.push(new DrawObjectiveCardAction())
		}

		return actions
	}
}
