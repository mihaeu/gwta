import { describe, expect, it } from "bun:test"
import { gameBoardWithFourPlayers, gameBoardWithTwoPlayers, removeFarmersFromBoard } from "../testUtils.js"
import { MoveOption } from "../../src/options/moveOption.js"
import {
	NeutralBuilding1,
	NeutralBuilding2,
	NeutralBuilding3,
	NeutralBuilding4,
	NeutralBuilding5,
	NeutralBuilding6,
	NeutralBuilding7,
	NeutralBuilding8,
} from "../../src/nodes.js"
import { MoveOptions } from "../../src/actions/moveOptions.js"
import { NeutralBuildingA } from "../../src/buildings/neutralBuildingA.js"
import { NeutralBuildingB } from "../../src/buildings/neutralBuildingB.js"
import { NeutralBuildingC } from "../../src/buildings/neutralBuildingC.js"
import { NeutralBuildingD } from "../../src/buildings/neutralBuildingD.js"
import { NeutralBuildingE } from "../../src/buildings/neutralBuildingE.js"
import { UpgradeType } from "../../src/player.js"
import { NeutralBuildingF } from "../../src/buildings/neutralBuildingF.js"
import { NeutralBuildingG } from "../../src/buildings/neutralBuildingG.js"
import { NeutralBuildingH } from "../../src/buildings/neutralBuildingH.js"

describe("Move Options", () => {
	it("should present all location for player", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.location = gameBoard.startLocation
		removeFarmersFromBoard(gameBoard)

		const options = new MoveOptions().resolve(gameBoard, one)
		const actual = options.toString()
		const expected = [
			new MoveOption(new NeutralBuilding1(new NeutralBuildingA())),
			new MoveOption(new NeutralBuilding2(new NeutralBuildingB())),
			new MoveOption(new NeutralBuilding3(new NeutralBuildingC())),
		].toString()
		expect(actual).toEqual(expected)
	})

	it("should present all location for player within a certain distance", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.location = gameBoard.startLocation

		const options = new MoveOptions(1).resolve(gameBoard, one)
		expect(options.toString()).toEqual([new MoveOption(new NeutralBuilding1(new NeutralBuildingA()))].toString())
	})

	it("should present all options within distance 5 in 4 player game", () => {
		const { gameBoard, one } = gameBoardWithFourPlayers()
		one.location = gameBoard.startLocation
		removeFarmersFromBoard(gameBoard)

		const options = new MoveOptions().resolve(gameBoard, one)
		expect(options.toString()).toEqual(
			[
				new MoveOption(new NeutralBuilding1(new NeutralBuildingA())),
				new MoveOption(new NeutralBuilding2(new NeutralBuildingB())),
				new MoveOption(new NeutralBuilding3(new NeutralBuildingC())),
				new MoveOption(new NeutralBuilding4(new NeutralBuildingD())),
				new MoveOption(new NeutralBuilding5(new NeutralBuildingE())),
			].toString(),
		)
	})

	it("should present all options within distance 8 in 4 player game with fully upgraded movement", () => {
		const { gameBoard, one } = gameBoardWithFourPlayers()
		one.location = gameBoard.startLocation
		one.upgrades.movementUpgradeOne = UpgradeType.UPGRADED
		one.upgrades.movementUpgradeTwo = UpgradeType.UPGRADED
		removeFarmersFromBoard(gameBoard)

		const options = new MoveOptions().resolve(gameBoard, one)
		expect(options.toString()).toEqual(
			[
				new MoveOption(new NeutralBuilding1(new NeutralBuildingA())),
				new MoveOption(new NeutralBuilding2(new NeutralBuildingB())),
				new MoveOption(new NeutralBuilding3(new NeutralBuildingC())),
				new MoveOption(new NeutralBuilding4(new NeutralBuildingD())),
				new MoveOption(new NeutralBuilding5(new NeutralBuildingE())),
				new MoveOption(new NeutralBuilding6(new NeutralBuildingF())),
				new MoveOption(new NeutralBuilding7(new NeutralBuildingG())),
				new MoveOption(new NeutralBuilding8(new NeutralBuildingH())),
			].toString(),
		)
	})
})
