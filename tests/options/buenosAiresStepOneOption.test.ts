import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { BuenosAiresStepOneOption } from "../../src/options/buenosAiresStepOneOption.js"
import { equal } from "node:assert/strict"
import { Franqueiro } from "../../src/cards.js"
import { BuyCowOption } from "../../src/options/buyCowOption.js"

describe("Buenos Aires Step One Option", () => {
	it("should move token down and receive reward", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		one.gainGrain(1)
		equal(one.coins, 0)
		deepEqual(gameBoard.leHavre.portOne, [one, two])

		new BuenosAiresStepOneOption(gameBoard.leHavre.portOne, gameBoard.leHavre.west.spaces[0], 1).resolve(gameBoard, one)

		equal(one.coins, 3)
		deepEqual(gameBoard.leHavre.west.spaces[0].player, one)
		deepEqual(gameBoard.leHavre.portOne, [two])
	})

	it("should be able to choose a cow as a reward for the North space in Liverpool", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		gameBoard.leHavre.portOne = [two]
		gameBoard.liverpool.portTwo = [one]
		one.gainGrain(1)
		gameBoard.cowMarket = [new Franqueiro(4), new Franqueiro(5)]

		equal(one.coins, 0)
		deepEqual(gameBoard.liverpool.portTwo, [one])

		const options = new BuenosAiresStepOneOption(gameBoard.liverpool.portTwo, gameBoard.liverpool.north.spaces[0], 1).resolve(
			gameBoard,
			one,
		)

		equal(one.coins, 0)
		deepEqual(gameBoard.liverpool.north.spaces[0].player, one)
		deepEqual(gameBoard.liverpool.portTwo, [])
		deepEqual(options, [new BuyCowOption(new Franqueiro(4), 0), new BuyCowOption(new Franqueiro(5), 0)])
	})
})
