// @ts-ignore
import { beforeEach, describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { Machinist } from "../../src/tiles.js"
import { PlayerBuilding6A } from "../../src/buildings/playerBuilding6A.js"
import { MoveTrainOption } from "../../src/options/moveTrainOption.js"
import { HireWorkerOptions } from "../../src/actions/hireWorkerOptions.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"

describe("Player Building 6A", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding6A())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
	})

	it("should see move train option based on machinists if job market is empty", () => {
		gameBoard.jobMarket.splice(0, gameBoard.jobMarket.length)
		one.hireWorker(new Machinist())
		one.hireWorker(new Machinist())
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new MoveTrainOption(3)])
	})

	it("should get hire worker with discount one option if possible", () => {
		one.machinists.splice(1, 2)
		one.gainCoins(7)
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new MoveTrainOption(1), new HireWorkerOptions(-1)])
	})
})
