import GameBoard from "../src/gameBoard.js"
import Engine from "../src/engine.js"
import RandomPlayer from "../src/randomplayer.js"
import { describe, it } from "node:test"
import * as assert from "assert"

describe("Engine", () => {
	it("should determine next player", () => {
		const gameBoard = new GameBoard()
		const one = new RandomPlayer("One", gameBoard.start, [], [])
		const two = new RandomPlayer("Two", gameBoard.start, [], [])
		const players = [one, two]
		const engine = new Engine(gameBoard, players)
		assert.equal(engine.nextPlayer(), one)

		one.nextTurn()
		assert.equal(engine.nextPlayer(), two)

		two.nextTurn()
		assert.equal(engine.nextPlayer(), one)
	})
})
