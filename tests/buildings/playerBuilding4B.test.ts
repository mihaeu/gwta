import { beforeEach, describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { BlueFarmer, HandColor } from "../../src/tiles.js"
import GameBoard from "../../src/gameBoard.js"
import Player from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { PlayerBuilding4B } from "../../src/buildings/playerBuilding4B.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"
import { CertificateOption } from "../../src/options/certificateOption.js"

describe("Player Building 4B", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding4B())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
	})

	it("should show gain 2 grain option if not enough helped farmers exist", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new GainGrainOption(2)])
	})

	it("should show gain 2 certificate markers for every 2 helped farmers", () => {
		one.helpFarmer(new BlueFarmer(HandColor.GREEN, 3))
		one.helpFarmer(new BlueFarmer(HandColor.GREEN, 3))
		one.helpFarmer(new BlueFarmer(HandColor.GREEN, 3))
		one.helpFarmer(new BlueFarmer(HandColor.GREEN, 3))
		one.helpFarmer(new BlueFarmer(HandColor.GREEN, 3))
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new CertificateOption(2), new GainGrainOption(2)])
	})

	it("should not show certificate option if player is already maxed out on certificates", () => {
		one.certificates = 4
		one.helpFarmer(new BlueFarmer(HandColor.GREEN, 3))
		one.helpFarmer(new BlueFarmer(HandColor.GREEN, 3))
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new GainGrainOption(2)])
	})
})
