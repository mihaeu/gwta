import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { AuxiliaryActionOptions } from "../actions/auxiliaryActionOptions.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { AnyCowCard, CowCard } from "../cards.js"
import { CostBenefitCombinedOptions } from "../actions/costBenefitCombinedOptions.js"
import { TakeCardFromCowMarketOptions } from "../actions/takeCardFromCowMarketOptions.js"
import { Option } from "../options/option.js"
import { DiscardCardOptions } from "../actions/discardCardOptions.js"
import { GainCoinOption } from "../options/gainCoinOption.js"

export class PlayerBuilding10B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 9
	public readonly victoryPoints: number = 13

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return [new AuxiliaryActionOptions()]
		}
		const options = [new AuxiliaryActionOptions(), new GainCoinOption(3)]
		if (currentPlayer.handCards.some((card) => card instanceof CowCard)) {
			options.push(new CostBenefitCombinedOptions(new DiscardCardOptions(new AnyCowCard()), new TakeCardFromCowMarketOptions()))
		}
		return options
	}
}
