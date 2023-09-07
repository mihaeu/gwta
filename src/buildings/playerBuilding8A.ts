import GameBoard from "../gameBoard.js"
import Player, { UpgradeType } from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { GainGrainOption } from "../options/gainGrainOption.js"
import { TokenToPortOptions } from "../actions/tokenToPortOptions.js"

export class PlayerBuilding8A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 5
	public readonly victoryPoints: number = 6

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		const tokenToPortOptions = new TokenToPortOptions(UpgradeType.BLACK, gameBoard.liverpool.portOne)
		return tokenToPortOptions.resolve(gameBoard, currentPlayer).length > 0
			? [new GainGrainOption(1), tokenToPortOptions]
			: [new GainGrainOption(1)]
	}
}
