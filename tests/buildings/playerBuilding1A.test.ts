import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { GainGrainAction } from "../../src/actions/gainGrainAction.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { PlayerBuilding1A } from "../../src/buildings/playerBuilding1A.js"

describe("Player Building 1A", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding1A())
	const playerBuilding1AOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuilding1AOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, two), [new AuxiliaryAction()])
		deepEqual(playerBuilding1AOfPlayerTwo.actions(gameBoard, one), [new AuxiliaryAction()])
	})

	it("should be allowed to to a get grain action on their building", () => {
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, one), [new AuxiliaryAction(), new GainGrainAction(1)])
		deepEqual(playerBuilding1AOfPlayerTwo.actions(gameBoard, two), [new AuxiliaryAction(), new GainGrainAction(1)])
	})
})
