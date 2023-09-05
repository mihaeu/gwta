import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { GainExchangeTokenOption } from "../options/gainExchangeTokenOption.js"
import { HelpFarmerOptions } from "../actions/helpFarmerOptions.js"

export class PlayerBuilding3A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.BLACK
	public readonly requiredCarpenters: number = 2
	public readonly victoryPoints: number = 3

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		const options = [new GainExchangeTokenOption()]
		const helpFarmerOptions = new HelpFarmerOptions(3)
		if (helpFarmerOptions.resolve(gameBoard, currentPlayer).length > 0) {
			options.push(helpFarmerOptions)
		}
		return options
	}
}
