import { NeutralBuilding } from "./buildings.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { HolandoArgentino } from "../cards.js"
import { Action } from "../actions/action.js"
import { CostBenefitCombinedAction } from "../actions/costBenefitCombinedAction.js"
import { DiscardCardAction } from "../actions/discardCardAction.js"
import { GainCoinAction } from "../actions/gainCoinAction.js"
import { HireWorkerAction } from "../actions/hireWorkerAction.js"

/**
 * Up to three available action:
 * 	- Discard a Holando Argentino for 2 gold
 *  - Hire a worker
 *  - Hire a worker for an extra cost of 2
 */
export class NeutralBuildingA extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions: Action[] = currentPlayer.handCards.some((card) => card instanceof HolandoArgentino)
			? [new CostBenefitCombinedAction(new DiscardCardAction(new HolandoArgentino()), new GainCoinAction(2))]
			: []
		if (currentPlayer.coins >= 6) {
			actions.push(new HireWorkerAction(0))
		}

		if (currentPlayer.coins >= 8) {
			actions.push(new HireWorkerAction(2))
		}
		return actions
	}
}
