import { describe, it } from "bun:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { RemoveCardOption } from "../../src/options/removeCardOption.js"

describe("Remove Card Option", () => {
	it("should remove card from hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.drawCards(4)
		const cardToRemove = one.handCards[0]
		new RemoveCardOption(cardToRemove, 1).resolve(gameBoard, one)
		deepEqual(one.handCards.length, 3)
		deepEqual(one["_removedCards"], [cardToRemove])
	})
})
