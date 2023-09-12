import { beforeEach, describe, it } from "bun:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { MoveOptions } from "../../src/actions/moveOptions.js"
import { PlayerBuilding9B } from "../../src/buildings/playerBuilding9B.js"
import { equal } from "node:assert/strict"
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
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
	})

	it("should present a move 5 action if player does not have gold to hire workers", () => {
		equal(one.coins, 0)
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new MoveOptions(5)])
	})

	it("should present hire workers options with discount of 4 if player has enough gold", () => {
		one.gainCoins(3)
		equal(one.coins, 3)
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new HireWorkerOptions(-4), new MoveOptions(5)])
	})
})
