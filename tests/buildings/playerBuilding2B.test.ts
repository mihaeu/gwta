import { beforeEach, describe, it } from "bun:test"
import { deepEqual } from "node:assert"
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
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
	})

	it("should present a move action", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new MoveOptions(1)])
	})

	it("should present a grain per farmer action if there are hired farmers", () => {
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new GainCoinOption(5), new MoveOptions(1)])
	})
})
