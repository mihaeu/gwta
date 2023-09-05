import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { GainGrainOption } from "../options/gainGrainOption.js"
import { HelpFarmerOptions } from "../actions/helpFarmerOptions.js"

export class PlayerBuilding8B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 5
	public readonly victoryPoints: number = 6

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		const options: Option[] = [new GainGrainOption(2)]
		const helpFarmersOptions = new HelpFarmerOptions(6)
		if (helpFarmersOptions.resolve(gameBoard, currentPlayer).length > 0) {
			options.push(helpFarmersOptions)
		}
		return options
	}
}
