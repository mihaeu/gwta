import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { ShipOptions } from "../../src/actions/shipOptions.js"

describe("Ship Options", () => {
	it("should have 4 options for the first delivery with a value of 5", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new ShipOptions(5).resolve(gameBoard, one)).toHaveLength(4)
	})

	it("should have 11 options for a value of 18", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new ShipOptions(18).resolve(gameBoard, one)).toHaveLength(11)
	})
})
