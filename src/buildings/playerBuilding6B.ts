import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { GainGrainOption } from "../options/gainGrainOption.js"
import { BuenosAiresStepOneOptions } from "../actions/buenosAiresStepOneOptions.js"

export class PlayerBuilding6B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 3
	public readonly victoryPoints: number = 4

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		const buenosAiresStepOneOptions = new BuenosAiresStepOneOptions()
		return buenosAiresStepOneOptions.resolve(gameBoard, currentPlayer).length > 0
			? [new GainGrainOption(3), new GainCoinOption(3), buenosAiresStepOneOptions]
			: [new GainGrainOption(3), new GainCoinOption(3)]
	}
}
