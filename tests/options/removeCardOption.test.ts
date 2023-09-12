// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { RemoveCardOption } from "../../src/options/removeCardOption.js"

describe("Remove Card Option", () => {
	it("should remove card from hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.drawCards(4)
		const cardToRemove = one.handCards[0]
		new RemoveCardOption(cardToRemove, 1).resolve(gameBoard, one)
		expect(one.handCards).toHaveLength(3)
		expect(one["_removedCards"]).toEqual([cardToRemove])
	})
})
