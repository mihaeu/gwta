import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { AllAsOneOption } from "../../src/options/allAsOneOption.js"

describe("All Resolved As One Option", () => {
	it("should resolve all options and return no further options", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(one.coins).toBe(7)
		let options = new AllAsOneOption(new GainCoinOption(3), new GainCoinOption(4), new GainCoinOption(5)).resolve(gameBoard, one)
		expect(one.coins).toBe(19)
		expect(options).toEqual([])
	})
})
