import { beforeEach, describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { MoveOptions } from "../../src/actions/moveOptions.js"
import { PlayerBuilding2B } from "../../src/buildings/playerBuilding2B.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { BlueFarmer, HandColor } from "../../src/farmer.js"

describe("Player Building 2B", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding2B())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
	})

	it("should present a grain per farmer action if there are hired farmers", () => {
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new GainCoinOption(6), new MoveOptions(1)])
	})
})
