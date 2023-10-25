import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { NeutralBuilding } from "./neutralBuilding.js"
import { MoveTrainOptions } from "../actions/moveTrainOptions.js"
import { DiscardTwoIdenticalCardsOptions } from "../actions/discardTwoIdenticalCardsOptions.js"
import { Option } from "../options/option.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { OneByOneOption } from "../options/oneByOneOption.js"

export class NeutralBuildingD extends NeutralBuilding {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = [new MoveTrainOptions()]

		const discardTwoIdenticalCardsOptions = new DiscardTwoIdenticalCardsOptions()
		if (discardTwoIdenticalCardsOptions.hasOptions(gameBoard, currentPlayer)) {
			options.push(new OneByOneOption(new GainCoinOption(2), discardTwoIdenticalCardsOptions))
		}

		return options
	}
}
