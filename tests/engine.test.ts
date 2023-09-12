// @ts-ignore
import { describe, expect, it } from "bun:test"
import RandomPlayer from "../src/randomPlayer.js"
import GameBoard from "../src/gameBoard.js"
import Engine from "../src/engine.js"
import { JobMarketToken, TakenJobMarketSlot } from "../src/tiles.js"

const gameBoardWithPlayers = (...playerNames: string[]) => {
	const players = playerNames.map((name) => new RandomPlayer(name))
	return new GameBoard(players)
}

describe("Engine", () => {
	describe("game end", () => {
		it("should occur when 22 workers were placed for two players", () => {
			const gameBoard = gameBoardWithPlayers("One", "Two")
			const engine = new Engine(gameBoard)
			gameBoard.jobMarket = new Array(22).fill(new TakenJobMarketSlot())
			expect(engine.isGameOver()).toBeFalse()

			gameBoard.jobMarket = gameBoard.jobMarket.concat([new JobMarketToken()])
			expect(engine.isGameOver()).toBeTrue()
		})

		it("should occur when 33 workers were placed for three players", () => {
			const gameBoard = gameBoardWithPlayers("One", "Two", "Three")
			const engine = new Engine(gameBoard)
			gameBoard.jobMarket = new Array(33).fill(new TakenJobMarketSlot())
			expect(engine.isGameOver()).toBeFalse()

			gameBoard.jobMarket = gameBoard.jobMarket.concat([new JobMarketToken()])
			expect(engine.isGameOver()).toBeTrue()
		})

		it("should occur when 44 workers were placed for four players", () => {
			const gameBoard = gameBoardWithPlayers("One", "Two", "Three", "Four")
			const engine = new Engine(gameBoard)
			gameBoard.jobMarket = new Array(44).fill(new TakenJobMarketSlot())
			expect(engine.isGameOver()).toBeFalse()

			gameBoard.jobMarket = gameBoard.jobMarket.concat([new JobMarketToken()])
			expect(engine.isGameOver()).toBeTrue()
		})
	})
})
