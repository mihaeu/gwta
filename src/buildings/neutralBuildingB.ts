import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { NeutralBuilding } from "./neutralBuilding.js"
import { Patagonico } from "../cards.js"
import { CostBenefitCombinedOptions } from "../actions/costBenefitCombinedOptions.js"
import { BuildOptions } from "../actions/buildOptions.js"
import { AuxiliaryActionOptions } from "../actions/auxiliaryActionOptions.js"
import { Option } from "../options/option.js"
import { DiscardCardOptions } from "../actions/discardCardOptions.js"
import { GainCoinOption } from "../options/gainCoinOption.js"

/**
 * Up to three available action:
 * 	- Discard a Patagonico for 2 gold
 *  - Build
 */
export class NeutralBuildingB extends NeutralBuilding {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const actions: Option[] = [new AuxiliaryActionOptions()]

		if (currentPlayer.hasCardOfTypeInHand(new Patagonico())) {
			actions.push(new CostBenefitCombinedOptions(new DiscardCardOptions(new Patagonico()), new GainCoinOption(2)))
		}

		if (new BuildOptions().resolve(gameBoard, currentPlayer).length > 0) {
			actions.push(new BuildOptions())
		}

		return actions
	}
}
