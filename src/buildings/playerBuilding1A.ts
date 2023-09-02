import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { BuildingHand } from "./neutralBuilding.js"
import { GainGrainAction } from "../actions/gainGrainAction.js"
import { PlayerBuilding } from "./playerBuilding.js"

export class PlayerBuilding1A extends PlayerBuilding {
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
			actions.push(new GainGrainAction(buildingsOnGrain))
		}

		return actions
	}
}
