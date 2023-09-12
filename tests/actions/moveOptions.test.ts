// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers, removeFarmersFromBoard } from "../testUtils.js"
import { MoveOption } from "../../src/options/moveOption.js"
import { NeutralBuilding1, NeutralBuilding2, NeutralBuilding3 } from "../../src/nodes.js"
import { MoveOptions } from "../../src/actions/moveOptions.js"
import { NeutralBuildingA } from "../../src/buildings/neutralBuildingA.js"
import { NeutralBuildingB } from "../../src/buildings/neutralBuildingB.js"
import { NeutralBuildingC } from "../../src/buildings/neutralBuildingC.js"

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
})
