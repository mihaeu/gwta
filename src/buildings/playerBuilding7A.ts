import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { MoveOptions } from "../actions/moveOptions.js"
import { GainGrainOption } from "../options/gainGrainOption.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { MoveTrainOptions } from "../actions/moveTrainOptions.js"
import { OneByOneOption } from "../options/oneByOneOption.js"
import { AllAsOneOption } from "../options/allAsOneOption.js"

export class PlayerBuilding7A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.GREEN
	public readonly requiredCarpenters: number = 4
	public readonly victoryPoints: number = 5

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		return currentPlayer.grain > 0
			? [
					new OneByOneOption(new AllAsOneOption(new GainGrainOption(-1), new GainCoinOption(2)), new MoveTrainOptions(2)),
					new MoveOptions(3),
			  ]
			: [new MoveOptions(3)]
	}
}
