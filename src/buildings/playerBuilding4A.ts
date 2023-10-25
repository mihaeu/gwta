import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { CertificateOption } from "../options/certificateOption.js"
import { OneByOneOption } from "../options/oneByOneOption.js"
import { DrawCardOption } from "../options/drawCardOption.js"
import { DiscardCardOptions } from "../actions/discardCardOptions.js"

export class PlayerBuilding4A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 2
	public readonly victoryPoints: number = 3

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		const herderCount = currentPlayer.herders.length
		return [new OneByOneOption(new DrawCardOption(herderCount), new DiscardCardOptions(herderCount)), new CertificateOption(2)]
	}
}
