import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { GainCoinAction } from "../../src/actions/gainCoinAction.js"
import { PlayerBuilding5B } from "../../src/buildings/playerBuilding5B.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { DoubleAuxiliaryAction } from "../../src/actions/doubleAuxiliaryAction.js"
import { Carpenter, HandColor, Herder, Machinist, YellowFarmer } from "../../src/tiles.js"

describe("Player Building 5B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding5B())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.actions(gameBoard, two), [new AuxiliaryAction()])
	})

	it("should get only double auxiliary option if there are no farmers on the player board", () => {
		deepEqual(playerBuildingOfPlayerOne.actions(gameBoard, one), [new DoubleAuxiliaryAction()])
	})

	it("should get gold action for each set of 4 different workers on the player board", () => {
		one.hireWorker(new Herder())
		one.hireWorker(new Herder())
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.hireWorker(new Machinist())
		one.hireWorker(new Machinist())
		one.farmers.push(new YellowFarmer(HandColor.GREEN, 7))
		one.farmers.push(new YellowFarmer(HandColor.BLACK, 5))
		deepEqual(playerBuildingOfPlayerOne.actions(gameBoard, one), [new DoubleAuxiliaryAction(), new GainCoinAction(12)])
	})
})
