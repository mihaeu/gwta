import { beforeEach, describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { MoveOptions } from "../../src/actions/moveOptions.js"
import { PlayerBuilding7B } from "../../src/buildings/playerBuilding7B.js"
import { AddExhaustionCardsToOtherPlayersOption } from "../../src/options/addExhaustionCardsToOtherPlayersOption.js"

describe("Player Building 7B", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding7B())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
	})

	it("should see add exhaustion cards to other player's discard piles and move 3 options", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new AddExhaustionCardsToOtherPlayersOption(), new MoveOptions(3)])
	})
})
