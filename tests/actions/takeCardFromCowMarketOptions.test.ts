import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { TakeCardFromCowMarketOptions } from "../../src/actions/takeCardFromCowMarketOptions.js"

describe("Take Card From Cow Market Options", () => {
	it("should list all available cow cards", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new TakeCardFromCowMarketOptions().resolve(gameBoard, one)).toHaveLength(9)
	})
})
