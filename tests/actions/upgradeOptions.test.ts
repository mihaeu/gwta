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
})
