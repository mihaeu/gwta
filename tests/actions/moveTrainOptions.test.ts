// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { MoveTrainOption } from "../../src/options/moveTrainOption.js"
import { Machinist } from "../../src/tiles.js"
import RandomPlayer from "../../src/randomPlayer.js"
import GameBoard from "../../src/gameBoard.js"

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

	it("should detect if train has enough space to revert", () => {
		const one = new RandomPlayer("One")
		const two = new RandomPlayer("Two")
		const three = new RandomPlayer("Three")
		const four = new RandomPlayer("Four")
		const gameBoard = new GameBoard([one, two, three, four])
		const railroadTrack = gameBoard.railroadTrackWithoutStationMasterSpaces
		railroadTrack[0] = []
		railroadTrack[1] = [one]
		expect(MoveTrainOptions.trainHasSpaceToRevert(1, railroadTrack, one)).toBeTrue()
		expect(MoveTrainOptions.trainHasSpaceToRevert(2, railroadTrack, one)).toBeFalse()

		railroadTrack[3] = [two]
		expect(MoveTrainOptions.trainHasSpaceToRevert(2, railroadTrack, two)).toBeTrue()
		expect(MoveTrainOptions.trainHasSpaceToRevert(3, railroadTrack, two)).toBeFalse()

		railroadTrack[5] = [three]
		expect(MoveTrainOptions.trainHasSpaceToRevert(3, railroadTrack, three)).toBeTrue()
		expect(MoveTrainOptions.trainHasSpaceToRevert(4, railroadTrack, three)).toBeFalse()

		railroadTrack[7] = [four]
		expect(MoveTrainOptions.trainHasSpaceToRevert(4, railroadTrack, four)).toBeTrue()
		expect(MoveTrainOptions.trainHasSpaceToRevert(5, railroadTrack, four)).toBeFalse()
	})
})
