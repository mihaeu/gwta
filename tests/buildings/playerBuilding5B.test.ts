import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { PlayerBuilding5B } from "../../src/buildings/playerBuilding5B.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { DoubleAuxiliaryOptions } from "../../src/actions/doubleAuxiliaryOptions.js"
import { Carpenter, HandColor, Herder, Machinist, YellowFarmer } from "../../src/tiles.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Player Building 5B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding5B())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]

	it("should not list actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
	})

	it("should get only double auxiliary option if there are no farmers on the player board", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new DoubleAuxiliaryOptions()])
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
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new DoubleAuxiliaryOptions(), new GainCoinOption(12)])
	})
})
