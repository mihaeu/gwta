import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { DoubleAuxiliaryAction } from "../actions/doubleAuxiliaryAction.js"
import { GainCoinAction } from "../actions/gainCoinAction.js"

export class PlayerBuilding5B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 3
	public readonly victoryPoints: number = 4

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return [new AuxiliaryAction()]
		}

		const actions = [new DoubleAuxiliaryAction()]
		if (currentPlayer.farmers.length > 0) {
			const numberOfSetsOfAllWorkers = Math.min(
				currentPlayer.farmers.length,
				currentPlayer.herders.length,
				currentPlayer.machinists.length,
				currentPlayer.carpenters.length,
			)
			actions.push(new GainCoinAction(6 * numberOfSetsOfAllWorkers))
		}
		return actions
	}
}
