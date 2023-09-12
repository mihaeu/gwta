import { beforeEach, describe, it } from "bun:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { MoveOptions } from "../../src/actions/moveOptions.js"
import { PlayerBuilding9A } from "../../src/buildings/playerBuilding9A.js"
import { CertificateOption } from "../../src/options/certificateOption.js"

describe("Player Building 9A", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding9A())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
	})

	it("should present a +3 certificate option and a move 3 action", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new CertificateOption(3), new MoveOptions(3)])
	})
})
