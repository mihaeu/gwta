import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { NeutralBuilding } from "./neutralBuilding.js"
import { GainCoinAction } from "../actions/gainCoinAction.js"
import { MoveTrainAction } from "../actions/moveTrainAction.js"
import { CostBenefitCombinedAction } from "../actions/costBenefitCombinedAction.js"
import { DiscardTwoIdenticalCardsAction } from "../actions/discardTwoIdenticalCardsAction.js"

export class NeutralBuildingD extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction(), new MoveTrainAction()]

		const discardTwoIdenticalCardsAction = new DiscardTwoIdenticalCardsAction()
		if (discardTwoIdenticalCardsAction.options(gameBoard, currentPlayer).length > 0) {
			actions.push(new CostBenefitCombinedAction(discardTwoIdenticalCardsAction, new GainCoinAction(2)))
		}

		return actions
	}
}
