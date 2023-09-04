import { NeutralBuilding } from "./neutralBuilding.js"
import { Option } from "../options/option.js"
import { Fronterizo } from "../cards.js"
import { CostBenefitCombinedOptions } from "../actions/costBenefitCombinedOptions.js"
import { DiscardCardOptions } from "../actions/discardCardOptions.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuyCowOptions } from "../actions/buyCowOptions.js"

export class NeutralBuildingE extends NeutralBuilding {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = []
		if (currentPlayer.hasCardOfTypeInHand(new Fronterizo())) {
			options.push(new CostBenefitCombinedOptions(new DiscardCardOptions(new Fronterizo()), new GainCoinOption(2), this))
		}
		const cowBuyingOptions = new BuyCowOptions().resolve(gameBoard, currentPlayer)
		return cowBuyingOptions.length > 0 ? options.concat(cowBuyingOptions) : options
	}
}
