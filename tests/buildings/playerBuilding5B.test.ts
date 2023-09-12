// @ts-ignore
import { describe, expect, it } from "bun:test"
import { PlayerBuilding5B } from "../../src/buildings/playerBuilding5B.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { DoubleAuxiliaryOptions } from "../../src/actions/doubleAuxiliaryOptions.js"
import { Carpenter, Herder, Machinist } from "../../src/tiles.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { HandColor, YellowFarmer } from "../../src/farmer.js"

describe("Player Building 5B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding5B())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]

	it("should not list actions on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
	})

	it("should get only double auxiliary option if there are no farmers on the player board", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new DoubleAuxiliaryOptions()])
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
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new DoubleAuxiliaryOptions(), new GainCoinOption(12)])
	})
})
