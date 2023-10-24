import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { DoubleAuxiliaryOptions } from "../../src/actions/doubleAuxiliaryOptions.js"
import { UpgradeType } from "../../src/player.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { FirstThanSecondsOption } from "../../src/options/firstThanSecondOption.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { CostBenefitCombinedOptions } from "../../src/actions/costBenefitCombinedOptions.js"
import { DrawCardOption } from "../../src/options/drawCardOption.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { AnyCard } from "../../src/cards.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { RemoveCardOptions } from "../../src/actions/removeCardOptions.js"
import { AllAsOneOption } from "../../src/options/allAsOneOption.js"

describe("Double Auxiliary Options", () => {
	it("should not have any options for a player without upgrades", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toHaveLength(0)
	})

	it("should see 2 coin option if upgraded", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.gainCoinDouble = UpgradeType.UPGRADED
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toEqual([new GainCoinOption(2)])
	})

	it("should be able to draw 2 cards and discard 2 cards if upgraded", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.drawAndDiscardCardDouble = UpgradeType.UPGRADED
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toEqual([
			new FirstThanSecondsOption(new DrawCardOption(2), new DiscardCardOptions(new AnyCard(), 2)),
		])
	})

	it("should not be able to draw 2 cards and discard 2 cards if not enough cards on hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.drawAndDiscardCardDouble = UpgradeType.UPGRADED
		one.handCards.splice(0, one.handCards.length - 1)
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toHaveLength(0)
	})

	it("should be abele to get 2 grain for 2 coin if upgraded", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.goldForGrainSingle = UpgradeType.UPGRADED
		one.upgrades.goldForGrainDouble = UpgradeType.UPGRADED
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toEqual([
			new FirstThanSecondsOption(new GainCoinOption(-2), new GainGrainOption(2)),
		])
	})

	it("should be abele to get 2 train move for 2 coin if upgraded", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.goldForTrainSingle = UpgradeType.UPGRADED
		one.upgrades.goldForTrainDouble = UpgradeType.UPGRADED
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toEqual([
			new FirstThanSecondsOption(new GainCoinOption(-2), new MoveTrainOptions(2)),
		])
	})

	it("should be able to trade 2 grain for 2 coin and 2 certificates", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.grainForCertificateAndGoldSingle = UpgradeType.UPGRADED
		one.upgrades.grainForCertificateAndGoldDouble = UpgradeType.UPGRADED
		one.gainGrain(2)
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toEqual([
			new AllAsOneOption(new GainGrainOption(-2), new CertificateOption(2), new GainCoinOption(2)),
		])
	})

	it("should be able to revert train by 2 and remove 2 cards if upgraded", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.revertTrainForCardRemovalSingle = UpgradeType.UPGRADED
		one.upgrades.revertTrainForCardRemovalDouble = UpgradeType.UPGRADED
		gameBoard.railroadTrackWithoutStationMasterSpaces[0] = []
		gameBoard.railroadTrackWithoutStationMasterSpaces[2] = [one]
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toEqual([
			new CostBenefitCombinedOptions(new MoveTrainOptions(-2), new RemoveCardOptions(new AnyCard(), 2)),
		])
	})

	it("should not be able to revert train by 2 and remove 2 cards if train is not advanced enough", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		one.upgrades.revertTrainForCardRemovalSingle = UpgradeType.UPGRADED
		one.upgrades.revertTrainForCardRemovalDouble = UpgradeType.UPGRADED
		gameBoard.railroadTrackWithoutStationMasterSpaces[0] = []
		gameBoard.railroadTrackWithoutStationMasterSpaces[1] = [two]
		gameBoard.railroadTrackWithoutStationMasterSpaces[2] = [one]
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toHaveLength(0)
	})
})
