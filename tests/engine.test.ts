// @ts-ignore
import { describe, expect, it } from "bun:test"
import Engine from "../src/engine.js"
import { JobMarketToken, TakenJobMarketSlot } from "../src/tiles.js"
import { gameBoardWithFourPlayers, gameBoardWithThreePlayers, gameBoardWithTwoPlayers } from "./testUtils.js"

describe("Engine", () => {
	describe("game end", () => {
		it("should occur when 22 workers were placed for two players and all had same number of turns", () => {
			const { gameBoard, one, two } = gameBoardWithTwoPlayers()
			const engine = new Engine(gameBoard)
			gameBoard.jobMarket = new Array(22).fill(new TakenJobMarketSlot())
			expect(engine.isGameOver()).toBeFalse()

			gameBoard.jobMarket = gameBoard.jobMarket.concat([new JobMarketToken()])
			one.nextTurn()
			expect(engine.isGameOver()).toBeFalse()
			two.nextTurn()
			expect(engine.isGameOver()).toBeTrue()
		})

		it("should occur when 33 workers were placed for three players", () => {
			const { gameBoard } = gameBoardWithThreePlayers()
			const engine = new Engine(gameBoard)
			gameBoard.jobMarket = new Array(33).fill(new TakenJobMarketSlot())
			expect(engine.isGameOver()).toBeFalse()

			gameBoard.jobMarket = gameBoard.jobMarket.concat([new JobMarketToken()])
			expect(engine.isGameOver()).toBeTrue()
		})

		it("should occur when 44 workers were placed for four players", () => {
			const { gameBoard } = gameBoardWithFourPlayers()
			const engine = new Engine(gameBoard)
			gameBoard.jobMarket = new Array(44).fill(new TakenJobMarketSlot())
			expect(engine.isGameOver()).toBeFalse()

			gameBoard.jobMarket = gameBoard.jobMarket.concat([new JobMarketToken()])
			expect(engine.isGameOver()).toBeTrue()
		})
	})
})
