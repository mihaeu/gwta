import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { TakeCardFromCowMarketOptions } from "../../src/actions/takeCardFromCowMarketOptions.js"

describe("Take Card From Cow Market Options", () => {
	it("should list all available cow cards", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		deepEqual(new TakeCardFromCowMarketOptions().resolve(gameBoard, one).length, 9)
	})
})
