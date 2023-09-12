// @ts-ignore
import { describe, expect, it } from "bun:test"
import { PlayerBuilding1B } from "../../src/buildings/playerBuilding1B.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Player Building 1B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding1B())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should not have options on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
		expect(playerBuildingOfPlayerTwo.options(gameBoard, one)).toHaveLength(0)
	})

	it("should be allowed to to a get coin action on their building", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new GainCoinOption(2)])
		expect(playerBuildingOfPlayerTwo.options(gameBoard, two)).toEqual([new GainCoinOption(2)])
	})
})
