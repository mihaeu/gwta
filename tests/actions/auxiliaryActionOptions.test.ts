import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { AnyCard, HolandoArgentino, Patagonico } from "../../src/cards.js"
import { DrawCardOption } from "../../src/options/drawCardOption.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { OneByOneOption } from "../../src/options/oneByOneOption.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { RemoveCardOption } from "../../src/options/removeCardOption.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { CostBenefitCombinedOptions } from "../../src/actions/costBenefitCombinedOptions.js"
import { UpgradeType } from "../../src/player.js"
import { AllAsOneOption } from "../../src/options/allAsOneOption.js"

describe("Auxiliary Action Options", () => {
	it("should list gain coins and draw card discard card action", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.pay(7)
		one.handCards.push(new Patagonico())
		one.handCards.push(new HolandoArgentino())
		expect(new AuxiliaryActionOptions().resolve(gameBoard, one)).toEqual([
			new GainCoinOption(1),
			new OneByOneOption(new DrawCardOption(), new DiscardCardOptions()),
		])
	})

	it("should contain options that require coins if player has enough coin", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new Patagonico())
		one.handCards.push(new HolandoArgentino())
		one.upgrades.goldForTrainSingle = UpgradeType.UPGRADED
		one.upgrades.goldForGrainSingle = UpgradeType.UPGRADED
		expect(new AuxiliaryActionOptions().resolve(gameBoard, one)).toEqual([
			new GainCoinOption(1),
			new OneByOneOption(new DrawCardOption(), new DiscardCardOptions()),
			new OneByOneOption(new GainCoinOption(-1), new GainGrainOption(1)),
			new OneByOneOption(new GainCoinOption(-1), new MoveTrainOptions(1)),
		])
	})

	it("should contain options that require grain if player has at least one grain", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new Patagonico())
		one.handCards.push(new HolandoArgentino())
		one.gainGrain(1)
		one.pay(7)
		one.upgrades.grainForCertificateAndGoldSingle = UpgradeType.UPGRADED
		expect(new AuxiliaryActionOptions().resolve(gameBoard, one)).toEqual([
			new GainCoinOption(1),
			new OneByOneOption(new DrawCardOption(), new DiscardCardOptions()),
			new AllAsOneOption(new GainGrainOption(-1), new CertificateOption(1), new GainCoinOption(1)),
		])
	})

	it("should show revert train in order to remove a card action if train has advanced", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.railroadTrackWithoutStationMasterSpaces[0] = []
		gameBoard.railroadTrackWithoutStationMasterSpaces[1] = [one]
		one.pay(7)
		one.upgrades.revertTrainForCardRemovalSingle = UpgradeType.UPGRADED
		expect(new AuxiliaryActionOptions().resolve(gameBoard, one)).toEqual([
			new GainCoinOption(1),
			new OneByOneOption(new DrawCardOption(), new DiscardCardOptions()),
			new CostBenefitCombinedOptions(new MoveTrainOptions(-1), new RemoveCardOption(new AnyCard())),
		])
	})

	it("should not be able to revert train if train has not advanced enough", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.railroadTrackWithoutStationMasterSpaces[0] = [one]
		one.pay(7)
		one.upgrades.revertTrainForCardRemovalSingle = UpgradeType.UPGRADED
		expect(new AuxiliaryActionOptions().resolve(gameBoard, one)).toEqual([
			new GainCoinOption(1),
			new OneByOneOption(new DrawCardOption(), new DiscardCardOptions()),
		])
	})
})
