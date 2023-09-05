import { describe, it } from "node:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { equal } from "node:assert/strict"
import { GainExchangeTokenOption } from "../../src/options/gainExchangeTokenOption.js"

describe("Gain Exchange Token Option", () => {
	it("should give one exchange token to the player", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		equal(one.exchangeTokens, 1)
		new GainExchangeTokenOption().resolve(gameBoard, one)
		equal(one.exchangeTokens, 2)
	})
})
