import { describe, it } from "bun:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { NeutralBuildingC } from "../../src/buildings/neutralBuildingC.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { DrawObjectiveCardOption } from "../../src/options/drawObjectiveCardOption.js"

describe("Neutral Building C", () => {
	it("should list draw objective card action if cards are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const neutralBuildingC = new NeutralBuildingC()
		const availableActions = neutralBuildingC.options(gameBoard, one)
		deepEqual(availableActions, [new MoveTrainOptions(1), new DrawObjectiveCardOption()])
	})

	it("should have only move train action if no objective cards are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.objectiveCards.splice(0, gameBoard.objectiveCards.length)

		const neutralBuildingC = new NeutralBuildingC()
		deepEqual(neutralBuildingC.options(gameBoard, one), [new MoveTrainOptions(1)])
	})
})
