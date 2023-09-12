import { describe, it } from "bun:test"
import { deepEqual } from "node:assert"
import { PlayerBuilding1B } from "../../src/buildings/playerBuilding1B.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Player Building 1B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding1B())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should not have options on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
		deepEqual(playerBuildingOfPlayerTwo.options(gameBoard, one), [])
	})

	it("should be allowed to to a get coin action on their building", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new GainCoinOption(2)])
		deepEqual(playerBuildingOfPlayerTwo.options(gameBoard, two), [new GainCoinOption(2)])
	})
})
