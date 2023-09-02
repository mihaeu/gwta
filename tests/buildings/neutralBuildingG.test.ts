import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { MoveTrainAction } from "../../src/actions/moveTrainAction.js"
import { NeutralBuildingG } from "../../src/buildings/neutralBuildingG.js"
import { DoubleAuxiliaryAction } from "../../src/actions/doubleAuxiliaryAction.js"

describe("Neutral Building G", () => {
	it("should always list double auxiliary action and move train action", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const neutralBuildingG = new NeutralBuildingG()
		deepEqual(neutralBuildingG.actions(gameBoard, one), [new MoveTrainAction(), new DoubleAuxiliaryAction()])
	})
})
