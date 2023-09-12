// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { FreeFranqueiroOptions } from "../../src/actions/freeFranqueiroOptions.js"
import { Franqueiro } from "../../src/cards.js"
import { BuyCowOption } from "../../src/options/buyCowOption.js"

describe("Free Franqueiro Options", () => {
	it("should be empty if no franqueiros are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.cowMarket = []
		expect(new FreeFranqueiroOptions().resolve(gameBoard, one)).toHaveLength(0)
	})

	it("should list free franqueiros if they are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.cowMarket = [new Franqueiro(4), new Franqueiro(5)]
		expect(new FreeFranqueiroOptions().resolve(gameBoard, one)).toEqual([
			new BuyCowOption(new Franqueiro(4), 0),
			new BuyCowOption(new Franqueiro(5), 0),
		])
	})
})
