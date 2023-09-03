import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { AuxiliaryActionOptions } from "../actions/auxiliaryActionOptions.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { GainCoinOption } from "../options/gainCoinOption.js"

export class PlayerBuilding1B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.BLACK
	public readonly requiredCarpenters: number = 1
	public readonly victoryPoints: number = 1

	buildingsOnGrain(gameBoard: GameBoard, currentPlayer: Player): number {
		return gameBoard.playerBuildings(currentPlayer).filter((location) => location.hasGrain).length
	}

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options = [new AuxiliaryActionOptions()]
		if (!this.isOwner(currentPlayer)) {
			return options
		}

		const buildingsOnGrain = this.buildingsOnGrain(gameBoard, currentPlayer)
		if (buildingsOnGrain > 0) {
			options.push(new GainCoinOption(buildingsOnGrain * 2))
		}

		return options
	}
}
