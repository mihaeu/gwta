import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { GainExchangeTokenOption } from "../../src/options/gainExchangeTokenOption.js"

describe("Gain Exchange Token Option", () => {
	it("should give one exchange token to the player", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		expect(one.exchangeTokens).toBe(1)
		new GainExchangeTokenOption().resolve(gameBoard, one)
		expect(one.exchangeTokens).toBe(2)
	})
})
