import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { NeutralBuilding } from "./neutralBuilding.js"
import { Patagonico } from "../cards.js"
import { CostBenefitCombinedAction } from "../actions/costBenefitCombinedAction.js"
import { DiscardCardAction } from "../actions/discardCardAction.js"
import { GainCoinAction } from "../actions/gainCoinAction.js"
import { BuildAction } from "../actions/buildAction.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"

/**
 * Up to three available action:
 * 	- Discard a Patagonico for 2 gold
 *  - Build
 */
export class NeutralBuildingB extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions: Action[] = [new AuxiliaryAction()]

		if (currentPlayer.hasCardOfTypeInHand(new Patagonico())) {
			actions.push(new CostBenefitCombinedAction(new DiscardCardAction(new Patagonico()), new GainCoinAction(2)))
		}

		if (new BuildAction().options(gameBoard, currentPlayer).length > 0) {
			actions.push(new BuildAction())
		}

		return actions
	}
}
