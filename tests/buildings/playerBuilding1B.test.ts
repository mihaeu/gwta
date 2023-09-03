import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { PlayerBuilding1B } from "../../src/buildings/playerBuilding1B.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Player Building 1B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding1B())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [new AuxiliaryActionOptions()])
		deepEqual(playerBuildingOfPlayerTwo.options(gameBoard, one), [new AuxiliaryActionOptions()])
	})

	it("should be allowed to to a get coin action on their building", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new AuxiliaryActionOptions(), new GainCoinOption(2)])
		deepEqual(playerBuildingOfPlayerTwo.options(gameBoard, two), [new AuxiliaryActionOptions(), new GainCoinOption(2)])
	})
})
