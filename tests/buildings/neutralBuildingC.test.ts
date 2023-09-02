import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { NeutralBuildingC } from "../../src/buildings/neutralBuildingC.js"
import { DrawObjectiveCardAction } from "../../src/actions/drawObjectiveCardAction.js"
import { MoveTrainAction } from "../../src/actions/moveTrainAction.js"

describe("Neutral Building C", () => {
	it("should list draw objective card action if cards are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const neutralBuildingC = new NeutralBuildingC()
		const availableActions = neutralBuildingC.actions(gameBoard, one)
		deepEqual(availableActions, [new AuxiliaryAction(), new MoveTrainAction(1), new DrawObjectiveCardAction()])
	})

	it("should only list auxiliary action and move train action if no objective cards are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.objectiveCards.splice(0, gameBoard.objectiveCards.length)

		const neutralBuildingC = new NeutralBuildingC()
		deepEqual(neutralBuildingC.actions(gameBoard, one), [new AuxiliaryAction(), new MoveTrainAction(1)])
	})
})