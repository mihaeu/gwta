import { beforeEach, describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { PlayerBuilding7A } from "../../src/buildings/playerBuilding7A.js"
import { MoveOptions } from "../../src/actions/moveOptions.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"
import { CompoundOption } from "../../src/options/compoundOption.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { FirstThanSecondsOption } from "../../src/options/firstThanSecondOption.js"

describe("Player Building 7A", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding7A())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
	})

	it("should see move train option if player has no grain", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new MoveOptions(3)])
	})

	it("should see pay 1 grain for two coins and up to two train movement", () => {
		one.gainGrain(1)
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([
			new FirstThanSecondsOption(new CompoundOption(new GainGrainOption(-1), new GainCoinOption(2)), new MoveTrainOptions(2)),
			new MoveOptions(3),
		])
	})
})
