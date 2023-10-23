import { Option } from "../options/option.js"
import Player, { Upgrades, UpgradeType } from "../player.js"
import GameBoard from "../gameBoard.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { FirstThanSecondsOption } from "../options/firstThanSecondOption.js"
import { GainGrainOption } from "../options/gainGrainOption.js"
import { MoveTrainOptions } from "./moveTrainOptions.js"
import { CostBenefitCombinedOptions } from "./costBenefitCombinedOptions.js"
import { AnyCard } from "../cards.js"
import { CompoundOption } from "../options/compoundOption.js"
import { CertificateOption } from "../options/certificateOption.js"
import { DrawCardOption } from "../options/drawCardOption.js"
import { DiscardCardOptions } from "./discardCardOptions.js"
import { RemoveCardOptions } from "./removeCardOptions.js"

export class DoubleAuxiliaryOptions extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const upgrades = currentPlayer.upgrades
		const options: Option[] = []

		// todo this needs to also provide single options if double is not available
		if (upgrades.gainCoinDouble === UpgradeType.UPGRADED) {
			options.push(new GainCoinOption(2))
		}

		if (currentPlayer.handCards.length >= 2 && upgrades.drawAndDiscardCardDouble === UpgradeType.UPGRADED) {
			options.push(new FirstThanSecondsOption(new DrawCardOption(2), new DiscardCardOptions(new AnyCard(), 2)))
		}

		if (this.isGoldForGrainFullyUpgraded(upgrades) && currentPlayer.coins >= 2) {
			options.push(new FirstThanSecondsOption(new GainCoinOption(-2), new GainGrainOption(2)))
		}

		if (this.isGoldForTrainFullyUpgraded(upgrades) && currentPlayer.coins >= 2) {
			options.push(new FirstThanSecondsOption(new GainCoinOption(-2), new MoveTrainOptions(2)))
		}

		if (
			this.isRevertTrainForCardRemovalFullyUpgraded(upgrades) &&
			MoveTrainOptions.trainHasSpaceToRevert(2, gameBoard.railroadTrackWithoutStationMasterSpaces, currentPlayer)
		) {
			options.push(new CostBenefitCombinedOptions(new MoveTrainOptions(-2), new RemoveCardOptions(new AnyCard(), 2)))
		}

		if (this.isGrainForCertificateAndCoinFullyUpgraded(upgrades) && currentPlayer.grain >= 2) {
			options.push(new CompoundOption(new GainGrainOption(-2), new CertificateOption(2), new GainCoinOption(2)))
		}

		return options
	}

	private isGrainForCertificateAndCoinFullyUpgraded(upgrades: Upgrades) {
		return (
			upgrades.grainForCertificateAndGoldDouble === UpgradeType.UPGRADED &&
			upgrades.grainForCertificateAndGoldSingle === UpgradeType.UPGRADED
		)
	}

	private isRevertTrainForCardRemovalFullyUpgraded(upgrades: Upgrades) {
		return (
			upgrades.revertTrainForCardRemovalDouble === UpgradeType.UPGRADED && upgrades.revertTrainForCardRemovalSingle === UpgradeType.UPGRADED
		)
	}

	private isGoldForTrainFullyUpgraded(upgrades: Upgrades) {
		return upgrades.goldForTrainDouble === UpgradeType.UPGRADED && upgrades.goldForTrainSingle === UpgradeType.UPGRADED
	}

	private isGoldForGrainFullyUpgraded(upgrades: Upgrades) {
		return upgrades.goldForGrainDouble === UpgradeType.UPGRADED && upgrades.goldForGrainSingle === UpgradeType.UPGRADED
	}
}
