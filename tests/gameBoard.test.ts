import GameBoard from "../src/gameBoard.js"
// @ts-ignore
import { describe, expect, it } from "bun:test"
import { Carpenter, JobMarketToken, TakenJobMarketSlot } from "../src/tiles.js"
import RandomPlayer from "../src/randomPlayer.js"
import { gameBoardWithTwoPlayers } from "./testUtils.js"
import { AberdeenAngus, ExhaustionCard, Franqueiro, Serrano } from "../src/cards.js"

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

	describe("scoring", () => {
		it("should add victory points from cow cards and subtract the ones from exhaustion cards", () => {
			const { gameBoard, one } = gameBoardWithTwoPlayers()
			one.handCards.push(new AberdeenAngus(7))
			expect(gameBoard.endgameScoring()[0].cowCards).toBe(5)

			one.discardedCards.push(new Franqueiro(5))
			expect(gameBoard.endgameScoring()[0].cowCards).toBe(10)

			one.cards.push(new Serrano())
			expect(gameBoard.endgameScoring()[0].cowCards).toBe(12)

			one.handCards.push(new ExhaustionCard())
			expect(gameBoard.endgameScoring()[0].cowCards).toBe(10)
		})
	})
})
