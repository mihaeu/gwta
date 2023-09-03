import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { AuxiliaryActionOptions } from "../actions/auxiliaryActionOptions.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"

export class PlayerBuilding9B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.BLACK
	public readonly requiredCarpenters: number = 7
	public readonly victoryPoints: number = 9

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options = [new AuxiliaryActionOptions()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return options
		}

		return options
	}
}
