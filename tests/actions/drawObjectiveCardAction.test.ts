import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { DrawObjectiveCardAction } from "../../src/actions/drawObjectiveCardAction.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { DrawObjectiveCardOption } from "../../src/options/drawObjectiveCardOption.js"

describe("Draw Objective Card Action", () => {
	it("should always present one draw objective card option", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		deepEqual(new DrawObjectiveCardAction().options(gameBoard, one), [new DrawObjectiveCardOption()])
	})
})
