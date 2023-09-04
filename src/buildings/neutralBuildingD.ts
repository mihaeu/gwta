import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { NeutralBuilding } from "./neutralBuilding.js"
import { MoveTrainOptions } from "../actions/moveTrainOptions.js"
import { CostBenefitCombinedOptions } from "../actions/costBenefitCombinedOptions.js"
import { DiscardTwoIdenticalCardsOptions } from "../actions/discardTwoIdenticalCardsOptions.js"
import { Option } from "../options/option.js"
import { GainCoinOption } from "../options/gainCoinOption.js"

export class NeutralBuildingD extends NeutralBuilding {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = [new MoveTrainOptions()]

		const discardTwoIdenticalCardsOptions = new DiscardTwoIdenticalCardsOptions()
		if (discardTwoIdenticalCardsOptions.hasOptions(gameBoard, currentPlayer)) {
			options.push(new CostBenefitCombinedOptions(discardTwoIdenticalCardsOptions, new GainCoinOption(2)))
		}

		return options
	}
}
