import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { GainGrainOption } from "../options/gainGrainOption.js"
import { CertificateOption } from "../options/certificateOption.js"

export class PlayerBuilding4B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 2
	public readonly victoryPoints: number = 3

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		return currentPlayer.helpedFarmers.length > 2 && currentPlayer.certificates < currentPlayer.maxCertificates()
			? [new CertificateOption(Math.floor(currentPlayer.helpedFarmers.length / 2)), new GainGrainOption(2)]
			: [new GainGrainOption(2)]
	}
}
