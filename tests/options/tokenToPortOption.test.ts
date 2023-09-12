import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { TokenToPortOption } from "../../src/options/tokenToPortOption.js"
import { UpgradeType } from "../../src/player.js"

describe("Token To Port Option", () => {
	it("should enable and upgrade and add the player to the port", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(one.upgrades.strengthUpgradeTwo).toEqual(UpgradeType.BLACK)
		expect(gameBoard.liverpool.portOne).toHaveLength(0)
		expect(new TokenToPortOption("strengthUpgradeTwo", gameBoard.liverpool.portOne).resolve(gameBoard, one)).toHaveLength(0)
		expect(one.upgrades.strengthUpgradeTwo).toEqual(UpgradeType.UPGRADED)
		expect(gameBoard.liverpool.portOne).toEqual([one])
	})
})
