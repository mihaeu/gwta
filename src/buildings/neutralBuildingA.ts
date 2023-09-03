import { NeutralBuilding } from "./neutralBuilding.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { HolandoArgentino } from "../cards.js"
import { CostBenefitCombinedOptions } from "../actions/costBenefitCombinedOptions.js"
import { DiscardCardOptions } from "../actions/discardCardOptions.js"
import { HireWorkerOptions } from "../actions/hireWorkerOptions.js"
import { AuxiliaryActionOptions } from "../actions/auxiliaryActionOptions.js"
import { Option } from "../options/option.js"
import { GainCoinOption } from "../options/gainCoinOption.js"

/**
 * Up to three available action:
 * 	- Discard a Holando Argentino for 2 gold
 *  - Hire a worker
 *  - Hire a worker for an extra cost of 2
 */
export class NeutralBuildingA extends NeutralBuilding {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = [new AuxiliaryActionOptions(this)]
		if (currentPlayer.hasCardOfTypeInHand(new HolandoArgentino())) {
			options.push(new CostBenefitCombinedOptions(new DiscardCardOptions(new HolandoArgentino()), new GainCoinOption(2), this))
		}

		const cheapestAvailableWorker = gameBoard.cheapestAvailableWorker()
		if (cheapestAvailableWorker === 0) {
			return options
		}

		if (currentPlayer.coins >= cheapestAvailableWorker) {
			options.push(new HireWorkerOptions(0, this))
		}

		if (currentPlayer.coins >= cheapestAvailableWorker + 2) {
			options.push(new HireWorkerOptions(2, this))
		}
		return options
	}
}
