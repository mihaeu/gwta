import { describe, it } from "bun:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { equal } from "node:assert/strict"
import { BuenosAiresStepOneOptions } from "../../src/actions/buenosAiresStepOneOptions.js"
import { BuenosAiresStepOneOption } from "../../src/options/buenosAiresStepOneOption.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Buenos Aires Step One Options", () => {
	it("should not have any options at the beginning of the game without grain", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		equal(one.grain, 0)
		const expectedOptions = new BuenosAiresStepOneOptions().resolve(gameBoard, one)
		deepEqual(expectedOptions, [])
	})

	it("should have 4 options with a token on Le Havre I and 1 grain", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.gainGrain(1)
		const actual = new BuenosAiresStepOneOptions().resolve(gameBoard, one)
		const expected = [3, 4, 4, 4].map((reward) => {
			return new BuenosAiresStepOneOption(
				[one],
				{
					reward: new GainCoinOption(reward),
					victoryPoints: 0,
				},
				1,
			)
		})
		deepEqual(actual.toString(), expected.toString())
	})

	it("should be able to afford a port space costing 4 with 1 grain if discount is 3", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		one.gainGrain(1)
		gameBoard.leHavre.portOne = []
		gameBoard.liverpool.portTwo = [one]
		gameBoard.liverpool.west.spaces[0].player = two
		gameBoard.liverpool.west.spaces[1].player = two
		gameBoard.liverpool.north.spaces[1].player = two
		gameBoard.liverpool.north.spaces[2].player = two

		const actual = new BuenosAiresStepOneOptions().resolve(gameBoard, one)
		const expected = new BuenosAiresStepOneOption(gameBoard.liverpool.portTwo, gameBoard.liverpool.north.spaces[0], 1)
		deepEqual(actual.length, 1)
		deepEqual((actual.pop() as BuenosAiresStepOneOption).equals(expected), true)
	})
})
