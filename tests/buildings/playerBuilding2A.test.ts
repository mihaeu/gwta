import { beforeEach, describe, it } from "bun:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { PlayerBuilding2A } from "../../src/buildings/playerBuilding2A.js"
import { DoubleAuxiliaryOptions } from "../../src/actions/doubleAuxiliaryOptions.js"
import { MoveOptions } from "../../src/actions/moveOptions.js"

describe("Player Building 2A", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding2A())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
	})

	it("should present a double auxiliary and a move action", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new DoubleAuxiliaryOptions(), new MoveOptions(1)])
	})
})
