import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { MoveTrainOption } from "../../src/options/moveTrainOption.js"
import RandomPlayer from "../../src/randomPlayer.js"

describe("Move Train Option", () => {
	/**
	 * start:
	 * ┌───┬───┬───┬──────┐
	 * │ _ │ _ │ _ │ 🚂🚂 │
	 * └───┴───┴───┴──────┘
	 *
	 * expected:
	 * ┌────┬───┬───┬────┐
	 * │ 🚂 │ _ │ _ │ 🚂 │
	 * └────┴───┴───┴────┘
	 */
	it("should move train exactly required distance if no other players are in the way", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		gameBoard.railroadTrackWithoutStationMasterSpaces[0] = [one, two]

		new MoveTrainOption(3).resolve(gameBoard, one)
		expect(gameBoard.railroadTrackWithoutStationMasterSpaces[0]).toEqual([two])
		expect(gameBoard.railroadTrackWithoutStationMasterSpaces[3]).toEqual([one])
	})

	/**
	 * start:
	 * ┌───┬────┬───┬────┬───┬────┬───┬────┐
	 * │ _ │ 🚂 │ _ │ 🚂 │ _ │ 🚂 │ _ │ 🚂 │
	 * └───┴────┴───┴────┴───┴────┴───┴────┘
	 *
	 * expected:
	 * ┌────┬────┬───┬────┬───┬────┬───┬───┐
	 * │ 🚂 │ 🚂 │ _ │ 🚂 │ _ │ 🚂 │ _ │ _ │
	 * └────┴────┴───┴────┴───┴────┴───┴───┘
	 */
	it("should skip spots with existing players", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		const three = new RandomPlayer("Three")
		const four = new RandomPlayer("Four")
		gameBoard.railroadTrackWithoutStationMasterSpaces[0] = [one]
		gameBoard.railroadTrackWithoutStationMasterSpaces[2] = [two]
		gameBoard.railroadTrackWithoutStationMasterSpaces[4] = [three]
		gameBoard.railroadTrackWithoutStationMasterSpaces[6] = [four]

		new MoveTrainOption(4).resolve(gameBoard, one)
		expect(gameBoard.railroadTrackWithoutStationMasterSpaces[7]).toEqual([one])
	})
})
