import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { DoubleAuxiliaryOptions } from "../actions/doubleAuxiliaryOptions.js"
import { Option } from "../options/option.js"
import { GainCoinOption } from "../options/gainCoinOption.js"

export class PlayerBuilding5B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 3
	public readonly victoryPoints: number = 4

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		const actions = [new DoubleAuxiliaryOptions()]
		if (currentPlayer.farmers.length > 0) {
			const numberOfSetsOfAllWorkers = Math.min(
				currentPlayer.farmers.length,
				currentPlayer.herders.length,
				currentPlayer.machinists.length,
				currentPlayer.carpenters.length,
			)
			actions.push(new GainCoinOption(6 * numberOfSetsOfAllWorkers))
		}
		return actions
	}
}
