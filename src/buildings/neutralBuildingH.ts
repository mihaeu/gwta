import { NeutralBuilding } from "./neutralBuilding.js"
import { Option } from "../options/option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { GainGrainOption } from "../options/gainGrainOption.js"
import { ExhaustionCard } from "../cards.js"
import { OrOption } from "../options/orOption.js"
import { RemoveCardOption } from "../options/removeCardOption.js"
import { AuxiliaryActionOptions } from "../actions/auxiliaryActionOptions.js"

export class NeutralBuildingH extends NeutralBuilding {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = []
		if (currentPlayer.farmers.length > 0) {
			options.push(new GainGrainOption(currentPlayer.farmers.length))
		}

		currentPlayer.handCards.some((card) => card instanceof ExhaustionCard)
			? options.push(new OrOption(new RemoveCardOption(new ExhaustionCard()), new AuxiliaryActionOptions()))
			: options.push(new AuxiliaryActionOptions())

		return options
	}
}
