import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { DrawObjectiveCardOption } from "../../src/options/drawObjectiveCardOption.js"
import { Objective } from "../../src/cards.js"
import { equal } from "node:assert/strict"

describe("Draw Objective Card Option", () => {
	it("should give one objective card to the player", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		equal(one.discardedCards.length, 0)
		new DrawObjectiveCardOption().resolve(gameBoard, one)
		deepEqual(one.discardedCards, [new Objective()])
	})
})
