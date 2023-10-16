import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { DiscardCardOption } from "../../src/options/discardCardOption.js"

describe("Discard Card Option", () => {
	it("should remove card from hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.drawCards(4)
		const cardToRemove = one.handCards[0]
		new DiscardCardOption(cardToRemove, 1).resolve(gameBoard, one)
		expect(one.handCards).toHaveLength(3)
		expect(one.discardedCards).toContain(cardToRemove)
	})
})
