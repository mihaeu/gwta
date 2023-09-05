import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { MoveOption } from "../../src/options/moveOption.js"
import { GrainBuilding3 } from "../../src/nodes.js"
import GameBoard from "../../src/gameBoard.js"

describe("Move Option", () => {
	it("should set player to new location", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		deepEqual(one.location, GameBoard.START)
		new MoveOption(new GrainBuilding3()).resolve(gameBoard, one)
		deepEqual(one.location, new GrainBuilding3())
	})
})
