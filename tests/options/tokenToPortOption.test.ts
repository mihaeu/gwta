import { describe, it } from "bun:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { TokenToPortOption } from "../../src/options/tokenToPortOption.js"
import { UpgradeType } from "../../src/player.js"

describe("Token To Port Option", () => {
	it("should enable and upgrade and add the player to the port", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		deepEqual(one.upgrades.strengthUpgradeTwo, UpgradeType.BLACK)
		deepEqual(gameBoard.liverpool.portOne, [])
		deepEqual(new TokenToPortOption("strengthUpgradeTwo", gameBoard.liverpool.portOne).resolve(gameBoard, one), [])
		deepEqual(one.upgrades.strengthUpgradeTwo, UpgradeType.UPGRADED)
		deepEqual(gameBoard.liverpool.portOne, [one])
	})
})
