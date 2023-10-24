import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { OneByOneOption } from "../../src/options/oneByOneOption.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("One By One Option", () => {
	it("should resolve single option", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		new OneByOneOption(new GainCoinOption(3)).resolve(gameBoard, one)
		expect(one.coins).toBe(10)
	})

	it("should return remaining options if there are more than 2", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		let options = new OneByOneOption(new GainCoinOption(3), new GainCoinOption(4), new GainCoinOption(5)).resolve(gameBoard, one)
		expect(one.coins).toBe(10)
		expect(options).toEqual([new OneByOneOption(new GainCoinOption(4), new GainCoinOption(5))])

		options = options[0].resolve(gameBoard, one)
		expect(one.coins).toBe(14)
		expect(options).toEqual([new OneByOneOption(new GainCoinOption(5))])

		options = options[0].resolve(gameBoard, one)
		expect(one.coins).toBe(19)
		expect(options).toEqual([])
	})
})
