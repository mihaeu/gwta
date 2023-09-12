import { describe, it } from "bun:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { PlayerBuilding1A } from "../../src/buildings/playerBuilding1A.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"

describe("Player Building 1A", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding1A())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should not have options on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
		deepEqual(playerBuildingOfPlayerTwo.options(gameBoard, one), [])
	})

	it("should be allowed to to a get grain action on their building", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new GainGrainOption(1)])
		deepEqual(playerBuildingOfPlayerTwo.options(gameBoard, two), [new GainGrainOption(1)])
	})
})
