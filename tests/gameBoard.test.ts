import GameBoard from "../src/gameBoard.js"
import { describe, it } from "node:test"
import { Carpenter, JobMarketToken, TakenJobMarketSlot } from "../src/tiles.js"
import RandomPlayer from "../src/randomPlayer.js"
import { strictEqual } from "node:assert/strict"
import { gameBoardWithTwoPlayers } from "./testUtils.js"
import assert from "assert"
import { deepEqual } from "node:assert"

describe("Game Board", () => {
	it("should detect all 22 empty building locations at the start of the game", () => {
		const gameBoard = new GameBoard([new RandomPlayer("Test")])
		strictEqual(gameBoard.emptyBuildingLocations().length, 22)
	})

	it("should detect the cheapest available worker if available", () => {
		const gameBoard = new GameBoard([new RandomPlayer("Test")])
		gameBoard.jobMarket = [new Carpenter(), new Carpenter(), new JobMarketToken()]
		strictEqual(gameBoard.cheapestAvailableWorker(), 6)
	})

	it("should detect if there all workers are taken", () => {
		const gameBoard = new GameBoard([new RandomPlayer("Test")])
		gameBoard.jobMarket = [
			new TakenJobMarketSlot(),
			new TakenJobMarketSlot(),
			new TakenJobMarketSlot(),
			new TakenJobMarketSlot(),
			new JobMarketToken(),
		]
		strictEqual(gameBoard.cheapestAvailableWorker(), 0)
	})

	it("should determine next player", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		assert.equal(gameBoard.nextPlayer(), one)

		one.nextTurn()
		assert.equal(gameBoard.nextPlayer(), two)

		two.nextTurn()
		assert.equal(gameBoard.nextPlayer(), one)
	})

	describe("ports", () => {
		it("should have every player on the first port of Le Havre at the start of the game", () => {
			const { gameBoard, one, two } = gameBoardWithTwoPlayers()
			deepEqual(gameBoard["leHavre"].portOne, [one, two])
		})
	})
})
