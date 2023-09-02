import GameBoard from "../src/gameBoard.js"
import { describe, it } from "node:test"
import { Carpenter, JobMarketToken, TakenJobMarketSlot } from "../src/tiles.js"
import RandomPlayer from "../src/randomplayer.js"
import { strictEqual } from "node:assert/strict"

describe("Game Board", () => {
	it("should detect all 22 empty building locations at the start of the game", () => {
		const gameBoard = new GameBoard()
		strictEqual(gameBoard.emptyBuildingLocations().length, 22)
	})

	it("should detect the cheapest available worker if available", () => {
		const gameBoard = new GameBoard()
		gameBoard.jobMarket = [new Carpenter(), new Carpenter(), new JobMarketToken()]
		strictEqual(gameBoard.cheapestAvailableWorker(), 6)
	})

	it("should detect if there all workers are taken", () => {
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", gameBoard.start, [], [])
		gameBoard.jobMarket = [
			new TakenJobMarketSlot(player),
			new TakenJobMarketSlot(player),
			new TakenJobMarketSlot(player),
			new TakenJobMarketSlot(player),
			new JobMarketToken(),
		]
		strictEqual(gameBoard.cheapestAvailableWorker(), 0)
	})
})
