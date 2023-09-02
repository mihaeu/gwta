import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { BuildingHand, PlayerBuilding } from "./buildings.js"
import { GainCoinAction } from "../actions/gainCoinAction.js"

export class PlayerBuilding1B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.BLACK
	public readonly requiredCarpenters: number = 1
	public readonly victoryPoints: number = 1

	buildingsOnGrain(gameBoard: GameBoard, currentPlayer: Player): number {
		return gameBoard.playerBuildings(currentPlayer).filter((location) => location.hasGrain).length
	}

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (!this.isOwner(currentPlayer)) {
			return actions
		}

		const buildingsOnGrain = this.buildingsOnGrain(gameBoard, currentPlayer)
		if (buildingsOnGrain > 0) {
			actions.push(new GainCoinAction(buildingsOnGrain * 2))
		}

		return actions
	}
}
