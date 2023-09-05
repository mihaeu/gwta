import { beforeEach, describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayersAndBuildings, removeFarmersFromBoard, setUpThreeFarmersWithTotalStrengthOf9 } from "../testUtils.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"
import { PlayerBuilding8B } from "../../src/buildings/playerBuilding8B.js"
import { HelpFarmerOptions } from "../../src/actions/helpFarmerOptions.js"

describe("Player Building 8B", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding8B())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
	})

	it("should show gain 2 grain option if no farmer can be helped", () => {
		removeFarmersFromBoard(gameBoard)
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new GainGrainOption(2)])
	})

	it("should help farmer action with 6 extra strength if options exist", () => {
		setUpThreeFarmersWithTotalStrengthOf9(gameBoard)
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new GainGrainOption(2), new HelpFarmerOptions(6)])
	})
})
