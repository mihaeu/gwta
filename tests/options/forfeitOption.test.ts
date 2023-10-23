import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { ForfeitOption } from "../../src/options/forfeitOption.js"

describe("Forfeit Option", () => {
	it("should do nothing", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new ForfeitOption().resolve(gameBoard, one)).toBeEmpty()
	})
})
