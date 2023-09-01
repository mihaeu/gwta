import GameBoard from "./gameBoard.js"
import { it } from "node:test"
import * as assert from "assert"

it("At the start of a game, all available building locations are detected", () => {
	const gameBoard = new GameBoard()
	assert.strictEqual(gameBoard.emptyBuildingLocations().length, 22)
})
