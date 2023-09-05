import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { DoubleAuxiliaryOptions } from "../../src/actions/doubleAuxiliaryOptions.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Double Auxiliary Options", () => {
	it("should list a combination of all 22 free spaces and 8 buildings given 6 carpenters and enough coin", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		deepEqual(new DoubleAuxiliaryOptions().resolve(gameBoard, one), [new GainCoinOption(2)])
	})
})