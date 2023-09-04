import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { MoveTrainOptions } from "../actions/moveTrainOptions.js"
import { Option } from "../options/option.js"
import { GainGrainOption } from "../options/gainGrainOption.js"
import { GainCoinOption } from "../options/gainCoinOption.js"

export class PlayerBuilding10A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 9
	public readonly victoryPoints: number = 13

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		return [new GainGrainOption(5), new GainCoinOption(5), new MoveTrainOptions(3)]
	}
}
