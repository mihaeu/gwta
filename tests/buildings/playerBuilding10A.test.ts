import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { GainCoinAction } from "../../src/actions/gainCoinAction.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { MoveTrainAction } from "../../src/actions/moveTrainAction.js"
import { GainGrainAction } from "../../src/actions/gainGrainAction.js"
import { PlayerBuilding10A } from "../../src/buildings/playerBuilding10A.js"

describe("Player Building 10A", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding10A())
	const playerBuilding1AOfPlayerOne = gameBoard.playerBuildings(one)[0]

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, two), [new AuxiliaryAction()])
	})

	it("should be allowed to get all actions if player is owner", () => {
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, one), [
			new AuxiliaryAction(),
			new GainGrainAction(5),
			new GainCoinAction(5),
			new MoveTrainAction(3),
		])
	})
})
