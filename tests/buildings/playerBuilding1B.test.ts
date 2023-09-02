import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { GainCoinAction } from "../../src/actions/gainCoinAction.js"
import { PlayerBuilding1B } from "../../src/buildings/playerBuilding1B.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"

describe("Player Building 1B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding1B())
	const playerBuilding1AOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuilding1AOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, two), [new AuxiliaryAction()])
		deepEqual(playerBuilding1AOfPlayerTwo.actions(gameBoard, one), [new AuxiliaryAction()])
	})

	it("should be allowed to to a get coin action on their building", () => {
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, one), [new AuxiliaryAction(), new GainCoinAction(2)])
		deepEqual(playerBuilding1AOfPlayerTwo.actions(gameBoard, two), [new AuxiliaryAction(), new GainCoinAction(2)])
	})
})
