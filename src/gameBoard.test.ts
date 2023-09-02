import GameBoard from "./gameBoard.js"
import { it } from "node:test"
import * as assert from "assert"
import { Carpenter, JobMarketToken } from "./tiles.js"

it("At the start of a game, all available building locations are detected", () => {
	const gameBoard = new GameBoard()
	assert.strictEqual(gameBoard.emptyBuildingLocations().length, 22)
})

it("At the start of a game, the cheapest worker should cost 6", () => {
	const gameBoard = new GameBoard()
	gameBoard.jobMarket = [new Carpenter(), new Carpenter(), new JobMarketToken()]
	assert.strictEqual(gameBoard.cheapestAvailableWorker(), 6)
})
