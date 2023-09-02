import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { MoveTrainAction } from "../../src/actions/moveTrainAction.js"
import { MoveTrainOption } from "../../src/options/moveTrainOption.js"
import { Machinist } from "../../src/tiles.js"

describe("Move Train Action", () => {
	it("should always present one move train option for every possible step", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		deepEqual(new MoveTrainAction(5).options(gameBoard, one), [
			new MoveTrainOption(1),
			new MoveTrainOption(2),
			new MoveTrainOption(3),
			new MoveTrainOption(4),
			new MoveTrainOption(5),
		])
	})

	it("should present move train options based on the number of machinists if no fixed distance was supplied", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.hireWorker(new Machinist())
		one.hireWorker(new Machinist())
		one.hireWorker(new Machinist())
		deepEqual(new MoveTrainAction().options(gameBoard, one), [
			new MoveTrainOption(1),
			new MoveTrainOption(2),
			new MoveTrainOption(3),
			new MoveTrainOption(4),
		])
	})
})