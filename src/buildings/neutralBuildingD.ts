import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { AuxiliaryActionOptions } from "../actions/auxiliaryActionOptions.js"
import { NeutralBuilding } from "./neutralBuilding.js"
import { MoveTrainOptions } from "../actions/moveTrainOptions.js"
import { CostBenefitCombinedOptions } from "../actions/costBenefitCombinedOptions.js"
import { DiscardTwoIdenticalCardsOptions } from "../actions/discardTwoIdenticalCardsOptions.js"
import { Option } from "../options/option.js"
import { GainCoinOption } from "../options/gainCoinOption.js"

export class NeutralBuildingD extends NeutralBuilding {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const actions = [new AuxiliaryActionOptions(), new MoveTrainOptions()]

		const discardTwoIdenticalCardsOptions = new DiscardTwoIdenticalCardsOptions()
		if (discardTwoIdenticalCardsOptions.hasOptions(gameBoard, currentPlayer)) {
			actions.push(new CostBenefitCombinedOptions(discardTwoIdenticalCardsOptions, new GainCoinOption(2)))
		}

		return actions
	}
}
