import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { BuenosAiresStepOneOption } from "../../src/options/buenosAiresStepOneOption.js"
import { Franqueiro } from "../../src/cards.js"
import { BuyCowOption } from "../../src/options/buyCowOption.js"

describe("Buenos Aires Step One Option", () => {
	it("should move token down and receive reward", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		one.gainGrain(1)
		expect(gameBoard.leHavre.portOne).toEqual([one, two])

		new BuenosAiresStepOneOption(gameBoard.leHavre.portOne, gameBoard.leHavre.west.spaces[0], 1).resolve(gameBoard, one)

		expect(one.coins).toBe(10)
		expect(gameBoard.leHavre.west.spaces[0].player).toEqual(one)
		expect(gameBoard.leHavre.portOne).toEqual([two])
	})

	it("should be able to choose a cow as a reward for the North space in Liverpool", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		gameBoard.leHavre.portOne = [two]
		gameBoard.liverpool.portTwo = [one]
		one.gainGrain(1)
		gameBoard.cowMarket = [new Franqueiro(4), new Franqueiro(5)]

		expect(gameBoard.liverpool.portTwo).toEqual([one])

		const options = new BuenosAiresStepOneOption(gameBoard.liverpool.portTwo, gameBoard.liverpool.north.spaces[0], 1).resolve(
			gameBoard,
			one,
		)

		expect(gameBoard.liverpool.north.spaces[0].player).toEqual(one)
		expect(gameBoard.liverpool.portTwo).toHaveLength(0)
		expect(options).toEqual([new BuyCowOption(new Franqueiro(4), 0), new BuyCowOption(new Franqueiro(5), 0)])
	})
})
