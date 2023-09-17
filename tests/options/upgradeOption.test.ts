// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { UpgradeOption } from "../../src/options/upgradeOption.js"
import { UpgradeType } from "../../src/player.js"

describe("Upgrade Option", () => {
	it("should set the upgrade to upgraded", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new UpgradeOption("movementUpgradeOne").resolve(gameBoard, one)).toHaveLength(0)
		expect(one.upgrades.movementUpgradeOne).toBe(UpgradeType.UPGRADED)
	})
})
