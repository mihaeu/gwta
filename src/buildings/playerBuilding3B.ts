import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { CertificateOption } from "../options/certificateOption.js"
import { DiscardCardOption } from "../options/discardCardOption.js"
import { ObjectiveCard } from "../objectiveCard.js"
import { AllAsOneOption } from "../options/allAsOneOption.js"

export class PlayerBuilding3B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.BLACK
	public readonly requiredCarpenters: number = 2
	public readonly victoryPoints: number = 3

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = []
		if (this.player && currentPlayer.name !== this.player.name) {
			return options
		}

		options.push(new CertificateOption(2))
		currentPlayer.handCards.forEach((card) => {
			if (card instanceof ObjectiveCard) {
				options.push(new AllAsOneOption(new DiscardCardOption(card), new CertificateOption(3)))
			}
		})

		return options
	}
}
