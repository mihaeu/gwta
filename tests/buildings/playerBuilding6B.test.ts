import { beforeEach, describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { PlayerBuilding6B } from "../../src/buildings/playerBuilding6B.js"
import { BuenosAiresStepOneOptions } from "../../src/actions/buenosAiresStepOneOptions.js"

describe("Player Building 6B", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding6B())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
	})

	it("should present only grain and coin options if player cannot do an extra delivery", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new GainGrainOption(3), new GainCoinOption(3)])
	})

	it("should see pay 1 grain for two coins and up to two train movement", () => {
		one.gainGrain(1)
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [
			new GainGrainOption(3),
			new GainCoinOption(3),
			new BuenosAiresStepOneOptions(),
		])
	})
})
