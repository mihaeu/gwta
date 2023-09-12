// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { PlayerBuilding1A } from "../../src/buildings/playerBuilding1A.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"

describe("Player Building 1A", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding1A())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should not have options on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
		expect(playerBuildingOfPlayerTwo.options(gameBoard, one)).toHaveLength(0)
	})

	it("should be allowed to to a get grain action on their building", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new GainGrainOption(1)])
		expect(playerBuildingOfPlayerTwo.options(gameBoard, two)).toEqual([new GainGrainOption(1)])
	})
})
