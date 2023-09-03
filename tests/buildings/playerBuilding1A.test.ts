import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { PlayerBuilding1A } from "../../src/buildings/playerBuilding1A.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"

describe("Player Building 1A", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding1A())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [new AuxiliaryActionOptions()])
		deepEqual(playerBuildingOfPlayerTwo.options(gameBoard, one), [new AuxiliaryActionOptions()])
	})

	it("should be allowed to to a get grain action on their building", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new AuxiliaryActionOptions(), new GainGrainOption(1)])
		deepEqual(playerBuildingOfPlayerTwo.options(gameBoard, two), [new AuxiliaryActionOptions(), new GainGrainOption(1)])
	})
})
