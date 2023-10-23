import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { UpgradeOptions } from "../../src/actions/upgradeOptions.js"
import { UpgradeType } from "../../src/player.js"

describe("Upgrade Options", () => {
	it("should list all options for black upgrade", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new UpgradeOptions(UpgradeType.BLACK).resolve(gameBoard, one)).toHaveLength(5)
	})

	it("should list only white options for white upgrade", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new UpgradeOptions(UpgradeType.WHITE).resolve(gameBoard, one)).toHaveLength(12)
	})

	it("should list black options if no more white tokens available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.gainCoinDouble = UpgradeType.UPGRADED
		one.upgrades.drawAndDiscardCardDouble = UpgradeType.UPGRADED
		one.upgrades.grainForCertificateAndGoldSingle = UpgradeType.UPGRADED
		one.upgrades.grainForCertificateAndGoldDouble = UpgradeType.UPGRADED
		one.upgrades.goldForGrainSingle = UpgradeType.UPGRADED
		one.upgrades.goldForGrainDouble = UpgradeType.UPGRADED
		one.upgrades.goldForTrainSingle = UpgradeType.UPGRADED
		one.upgrades.goldForTrainDouble = UpgradeType.UPGRADED
		one.upgrades.revertTrainForCardRemovalSingle = UpgradeType.UPGRADED
		one.upgrades.revertTrainForCardRemovalDouble = UpgradeType.UPGRADED
		one.upgrades.certificateUpgrade = UpgradeType.UPGRADED
		one.upgrades.strengthUpgradeOne = UpgradeType.UPGRADED
		expect(new UpgradeOptions(UpgradeType.WHITE).resolve(gameBoard, one)).toHaveLength(5)
	})
})
