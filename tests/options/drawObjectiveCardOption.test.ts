import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { DrawObjectiveCardOption } from "../../src/options/drawObjectiveCardOption.js"
import { Objective } from "../../src/cards.js"

describe("Draw Objective Card Option", () => {
	it("should give one objective card to the player", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(one.discardedCards).toHaveLength(0)
		new DrawObjectiveCardOption().resolve(gameBoard, one)
		expect(one.discardedCards).toEqual([new Objective()])
	})
})
