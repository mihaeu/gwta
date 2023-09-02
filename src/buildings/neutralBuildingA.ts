import { NeutralBuilding } from "./neutralBuilding.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { HolandoArgentino } from "../cards.js"
import { Action } from "../actions/action.js"
import { CostBenefitCombinedAction } from "../actions/costBenefitCombinedAction.js"
import { DiscardCardAction } from "../actions/discardCardAction.js"
import { GainCoinAction } from "../actions/gainCoinAction.js"
import { HireWorkerAction } from "../actions/hireWorkerAction.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"

/**
 * Up to three available action:
 * 	- Discard a Holando Argentino for 2 gold
 *  - Hire a worker
 *  - Hire a worker for an extra cost of 2
 */
export class NeutralBuildingA extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions: Action[] = [new AuxiliaryAction()]
		if (currentPlayer.hasCardOfTypeInHand(new HolandoArgentino())) {
			actions.push(new CostBenefitCombinedAction(new DiscardCardAction(new HolandoArgentino()), new GainCoinAction(2)))
		}

		const cheapestAvailableWorker = gameBoard.cheapestAvailableWorker()
		if (cheapestAvailableWorker === 0) {
			return actions
		}

		if (currentPlayer.coins >= cheapestAvailableWorker) {
			actions.push(new HireWorkerAction(0))
		}

		if (currentPlayer.coins >= cheapestAvailableWorker + 2) {
			actions.push(new HireWorkerAction(2))
		}
		return actions
	}
}
