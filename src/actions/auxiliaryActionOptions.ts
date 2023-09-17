import { Option } from "../options/option.js"
import Player, { UpgradeType } from "../player.js"
import GameBoard from "../gameBoard.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { DrawCardOption } from "../options/drawCardOption.js"
import { FirstThanSecondsOption } from "../options/firstThanSecondOption.js"
import { DiscardCardOptions } from "./discardCardOptions.js"
import { Building } from "../buildings/building.js"
import { GainGrainOption } from "../options/gainGrainOption.js"
import { CompoundOption } from "../options/compoundOption.js"
import { CertificateOption } from "../options/certificateOption.js"
import { MoveTrainOptions } from "./moveTrainOptions.js"
import { RemoveCardOption } from "../options/removeCardOption.js"
import { AnyCard } from "../cards.js"
import { CostBenefitCombinedOptions } from "./costBenefitCombinedOptions.js"

export class AuxiliaryActionOptions extends Option {
	constructor(building?: Building) {
		super()
		this._building = building
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = [new GainCoinOption(1)]

		if (currentPlayer.handCards.length > 0) {
			options.push(new FirstThanSecondsOption(new DrawCardOption(), new DiscardCardOptions()))
		}

		const upgrades = currentPlayer.upgrades
		if (currentPlayer.coins > 0 && upgrades.goldForGrainSingle === UpgradeType.UPGRADED) {
			options.push(new FirstThanSecondsOption(new GainCoinOption(-1), new GainGrainOption(1)))
		}

		if (currentPlayer.coins > 0 && upgrades.goldForTrainSingle === UpgradeType.UPGRADED) {
			upgrades.goldForTrainSingle && options.push(new FirstThanSecondsOption(new GainCoinOption(-1), new MoveTrainOptions(1)))
		}

		const trainHasSpaceToRevert = !(gameBoard.railroadTrackWithoutStationMasterSpaces[0] ?? []).some((player) =>
			player.equals(currentPlayer),
		)
		if (upgrades.revertTrainForCardRemovalSingle === UpgradeType.UPGRADED && trainHasSpaceToRevert) {
			options.push(new CostBenefitCombinedOptions(new MoveTrainOptions(-1), new RemoveCardOption(new AnyCard())))
		}

		if (upgrades.grainForCertificateAndGoldSingle === UpgradeType.UPGRADED && currentPlayer.grain > 0) {
			options.push(new CompoundOption(new GainGrainOption(-1), new CertificateOption(1), new GainCoinOption(1)))
		}

		return options
	}
}
