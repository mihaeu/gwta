// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { MoveTrainOption } from "../../src/options/moveTrainOption.js"
import { Machinist } from "../../src/tiles.js"

describe("Move Train Options", () => {
	it("should always present one move train option for every possible step", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new MoveTrainOptions(5).resolve(gameBoard, one)).toEqual([
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
		expect(new MoveTrainOptions().resolve(gameBoard, one)).toEqual([
			new MoveTrainOption(1),
			new MoveTrainOption(2),
			new MoveTrainOption(3),
			new MoveTrainOption(4),
		])
	})
})
