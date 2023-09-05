import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { DiscardCardOption } from "../../src/options/discardCardOption.js"

describe("Discard Card Option", () => {
	it("should remove card from hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.drawCards(4)
		const cardToRemove = one.handCards[0]
		new DiscardCardOption(cardToRemove, 1).resolve(gameBoard, one)
		deepEqual(one.handCards.length, 3)
		deepEqual(one.discardedCards, [cardToRemove])
	})
})
