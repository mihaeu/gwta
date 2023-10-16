import { NeutralBuilding } from "./neutralBuilding.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { HolandoArgentino } from "../cards.js"
import { DiscardCardOptions } from "../actions/discardCardOptions.js"
import { HireWorkerOptions } from "../actions/hireWorkerOptions.js"
import { Option } from "../options/option.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { FirstThanSecondsOption } from "../options/firstThanSecondOption.js"

/**
 * Up to three available action:
 * 	- Discard a Holando Argentino for 2 gold
 *  - Hire a worker
 *  - Hire a worker for an extra cost of 2
 */
export class NeutralBuildingA extends NeutralBuilding {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = []
		if (currentPlayer.hasCardOfTypeInHand(new HolandoArgentino())) {
			options.push(new FirstThanSecondsOption(new GainCoinOption(2), new DiscardCardOptions(new HolandoArgentino())))
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
