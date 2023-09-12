// @ts-ignore
import { beforeEach, describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { MoveOptions } from "../../src/actions/moveOptions.js"
import { PlayerBuilding9B } from "../../src/buildings/playerBuilding9B.js"
import { HireWorkerOptions } from "../../src/actions/hireWorkerOptions.js"

describe("Player Building 9B", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding9B())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
	})

	it("should present a move 5 action if player does not have gold to hire workers", () => {
		one.pay(7)
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new MoveOptions(5)])
	})

	it("should present hire workers options with discount of 4 if player has enough gold", () => {
		one.gainCoins(3)
		expect(one.coins).toBe(10)
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new HireWorkerOptions(-4), new MoveOptions(5)])
	})
})
