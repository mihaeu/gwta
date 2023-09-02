import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { MoveTrainOption } from "../../src/options/moveTrainOption.js"
import RandomPlayer from "../../src/randomplayer.js"

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
		deepEqual(gameBoard.railroadTrackWithoutStationMasterSpaces[0], [two])
		deepEqual(gameBoard.railroadTrackWithoutStationMasterSpaces[3], [one])
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
		const three = new RandomPlayer("Three", gameBoard.start, [], [])
		const four = new RandomPlayer("Four", gameBoard.start, [], [])
		gameBoard.railroadTrackWithoutStationMasterSpaces[0] = [one]
		gameBoard.railroadTrackWithoutStationMasterSpaces[2] = [two]
		gameBoard.railroadTrackWithoutStationMasterSpaces[4] = [three]
		gameBoard.railroadTrackWithoutStationMasterSpaces[6] = [four]

		new MoveTrainOption(4).resolve(gameBoard, one)
		deepEqual(gameBoard.railroadTrackWithoutStationMasterSpaces[7], [one])
	})
})
