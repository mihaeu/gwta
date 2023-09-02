import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { GainGrainAction } from "../../src/actions/gainGrainAction.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { PlayerBuilding1A } from "../../src/buildings/playerBuilding1A.js"

describe("Player Building 1A", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding1A())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.actions(gameBoard, two), [new AuxiliaryAction()])
		deepEqual(playerBuildingOfPlayerTwo.actions(gameBoard, one), [new AuxiliaryAction()])
	})

	it("should be allowed to to a get grain action on their building", () => {
		deepEqual(playerBuildingOfPlayerOne.actions(gameBoard, one), [new AuxiliaryAction(), new GainGrainAction(1)])
		deepEqual(playerBuildingOfPlayerTwo.actions(gameBoard, two), [new AuxiliaryAction(), new GainGrainAction(1)])
	})
})
