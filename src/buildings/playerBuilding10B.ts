import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { GainCoinAction } from "../actions/gainCoinAction.js"
import { AnyCowCard, CowCard } from "../cards.js"
import { CostBenefitCombinedAction } from "../actions/costBenefitCombinedAction.js"
import { DiscardCardAction } from "../actions/discardCardAction.js"
import { TakeCardFromCowMarketAction } from "../actions/takeCardFromCowMarketAction.js"

export class PlayerBuilding10B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 9
	public readonly victoryPoints: number = 13

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return [new AuxiliaryAction()]
		}
		const actions = [new AuxiliaryAction(), new GainCoinAction(3)]
		if (currentPlayer.handCards.some((card) => card instanceof CowCard)) {
			actions.push(new CostBenefitCombinedAction(new DiscardCardAction(new AnyCowCard()), new TakeCardFromCowMarketAction()))
		}
		return actions
	}
}
