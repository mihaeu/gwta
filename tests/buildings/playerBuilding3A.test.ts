// @ts-ignore
import { beforeEach, describe, expect, it } from "bun:test"
import {
	gameBoardWithTwoPlayers,
	gameBoardWithTwoPlayersAndBuildings,
	removeFarmersFromBoard,
	setUpThreeFarmersWithTotalStrengthOf9,
} from "../testUtils.js"
import { PlayerBuilding3A } from "../../src/buildings/playerBuilding3A.js"
import { GainExchangeTokenOption } from "../../src/options/gainExchangeTokenOption.js"
import { Caracu } from "../../src/cards.js"
import { HelpFarmerOptions } from "../../src/actions/helpFarmerOptions.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { HandColor, OrangeFarmer } from "../../src/farmer.js"

describe("Player Building 3A", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding3A())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
	})

	it("should be be able to get exchange token option", () => {
		removeFarmersFromBoard(gameBoard)
		const orangeFarmer = new OrangeFarmer(HandColor.BLACK, 8)
		gameBoard.orangeFarmers[0].addFarmer(orangeFarmer)
		one.discardCards()
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new GainExchangeTokenOption()])
	})

	it("should be be able to a help farmer option if options for that exist", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		setUpThreeFarmersWithTotalStrengthOf9(gameBoard)
		one.handCards.push(new Caracu(3))
		one.handCards.push(new Caracu(3))
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new GainExchangeTokenOption(), new HelpFarmerOptions(3)])
	})
})
