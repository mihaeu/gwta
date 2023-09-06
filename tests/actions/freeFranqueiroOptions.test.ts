import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { FreeFranqueiroOptions } from "../../src/actions/freeFranqueiroOptions.js"
import { Franqueiro } from "../../src/cards.js"
import { BuyCowOption } from "../../src/options/buyCowOption.js"

describe("Free Franqueiro Options", () => {
	it("should be empty if no franqueiros are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.cowMarket = []
		deepEqual(new FreeFranqueiroOptions().resolve(gameBoard, one), [])
	})

	it("should list free franqueiros if they are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.cowMarket = [new Franqueiro(4), new Franqueiro(5)]
		deepEqual(new FreeFranqueiroOptions().resolve(gameBoard, one), [
			new BuyCowOption(new Franqueiro(4), 0),
			new BuyCowOption(new Franqueiro(5), 0),
		])
	})
})
