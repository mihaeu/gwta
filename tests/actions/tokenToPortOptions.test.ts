import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { TokenToPortOptions } from "../../src/actions/tokenToPortOptions.js"
import { UpgradeType } from "../../src/player.js"
import { TokenToPortOption } from "../../src/options/tokenToPortOption.js"

describe("Token To Port Options", () => {
	it("should present all available upgrades when choosing to upgrade a black token", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		deepEqual(new TokenToPortOptions(UpgradeType.BLACK, gameBoard.liverpool.portOne).resolve(gameBoard, one), [
			new TokenToPortOption("gainCoinDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("drawAndDiscardCardDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("grainForCertificateAndGoldSingle", gameBoard.liverpool.portOne),
			new TokenToPortOption("grainForCertificateAndGoldDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("goldForGrainSingle", gameBoard.liverpool.portOne),
			new TokenToPortOption("goldForGrainDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("goldForTrainSingle", gameBoard.liverpool.portOne),
			new TokenToPortOption("goldForTrainDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("revertTrainForCardRemovalSingle", gameBoard.liverpool.portOne),
			new TokenToPortOption("revertTrainForCardRemovalDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("movementUpgradeOne", gameBoard.liverpool.portOne),
			new TokenToPortOption("movementUpgradeTwo", gameBoard.liverpool.portOne),
			new TokenToPortOption("handLimitUpgradeOne", gameBoard.liverpool.portOne),
			new TokenToPortOption("handLimitUpgradeTwo", gameBoard.liverpool.portOne),
			new TokenToPortOption("certificateUpgrade", gameBoard.liverpool.portOne),
			new TokenToPortOption("strengthUpgradeOne", gameBoard.liverpool.portOne),
			new TokenToPortOption("strengthUpgradeTwo", gameBoard.liverpool.portOne),
		])
	})

	it("should present remaining black tokens even if white was chosen, but no white tokens remain", () => {
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
		deepEqual(new TokenToPortOptions(UpgradeType.BLACK, gameBoard.liverpool.portOne).resolve(gameBoard, one), [
			new TokenToPortOption("movementUpgradeOne", gameBoard.liverpool.portOne),
			new TokenToPortOption("movementUpgradeTwo", gameBoard.liverpool.portOne),
			new TokenToPortOption("handLimitUpgradeOne", gameBoard.liverpool.portOne),
			new TokenToPortOption("handLimitUpgradeTwo", gameBoard.liverpool.portOne),
			new TokenToPortOption("strengthUpgradeTwo", gameBoard.liverpool.portOne),
		])
	})

	it("should present available white upgrades when choosing to upgrade a white token", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		deepEqual(new TokenToPortOptions(UpgradeType.WHITE, gameBoard.liverpool.portOne).resolve(gameBoard, one), [
			new TokenToPortOption("gainCoinDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("drawAndDiscardCardDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("grainForCertificateAndGoldSingle", gameBoard.liverpool.portOne),
			new TokenToPortOption("grainForCertificateAndGoldDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("goldForGrainSingle", gameBoard.liverpool.portOne),
			new TokenToPortOption("goldForGrainDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("goldForTrainSingle", gameBoard.liverpool.portOne),
			new TokenToPortOption("goldForTrainDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("revertTrainForCardRemovalSingle", gameBoard.liverpool.portOne),
			new TokenToPortOption("revertTrainForCardRemovalDouble", gameBoard.liverpool.portOne),
			new TokenToPortOption("certificateUpgrade", gameBoard.liverpool.portOne),
			new TokenToPortOption("strengthUpgradeOne", gameBoard.liverpool.portOne),
		])
	})
})
