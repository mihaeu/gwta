import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { MoveOption } from "../../src/options/moveOption.js"
import { GrainBuilding3, Start } from "../../src/nodes.js"

describe("Move Option", () => {
	it("should set player to new location", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(one.location).toEqual(new Start())
		new MoveOption(new GrainBuilding3()).resolve(gameBoard, one)
		expect(one.location).toEqual(new GrainBuilding3())
	})
})
