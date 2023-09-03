import Engine from "../src/engine.js"
import { describe, it } from "node:test"
import * as assert from "assert"
import { gameBoardWithTwoPlayers } from "./testUtils.js"

describe("Engine", () => {
	it("should determine next player", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		const players = [one, two]
		const engine = new Engine(players)
		assert.equal(engine.nextPlayer(), one)

		one.nextTurn()
		assert.equal(engine.nextPlayer(), two)

		two.nextTurn()
		assert.equal(engine.nextPlayer(), one)
	})
})
