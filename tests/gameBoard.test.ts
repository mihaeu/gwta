import GameBoard from "../src/gameBoard.js"
// @ts-ignore
import { describe, expect, it } from "bun:test"
import { Carpenter, JobMarketToken, TakenJobMarketSlot } from "../src/tiles.js"
import RandomPlayer from "../src/randomPlayer.js"
import { gameBoardWithTwoPlayers } from "./testUtils.js"

describe("Game Board", () => {
	it("should detect all 22 empty building locations at the start of the game", () => {
		const gameBoard = new GameBoard([new RandomPlayer("Test")])
		expect(gameBoard.emptyBuildingLocations()).toHaveLength(22)
	})

	it("should detect the cheapest available worker if available", () => {
		const gameBoard = new GameBoard([new RandomPlayer("Test")])
		gameBoard.jobMarket = [new Carpenter(), new Carpenter(), new JobMarketToken()]
		expect(gameBoard.cheapestAvailableWorker()).toBe(6)
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
		expect(gameBoard.cheapestAvailableWorker()).toBe(0)
	})

	it("should determine next player", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		expect(gameBoard.nextPlayer()).toBe(one)

		one.nextTurn()
		expect(gameBoard.nextPlayer()).toBe(two)

		two.nextTurn()
		expect(gameBoard.nextPlayer()).toBe(one)
	})

	describe("ports", () => {
		it("should have every player on the first port of Le Havre at the start of the game", () => {
			const { gameBoard, one, two } = gameBoardWithTwoPlayers()
			expect(gameBoard["leHavre"].portOne).toEqual([one, two])
		})
	})
})
