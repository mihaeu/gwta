// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithFourPlayers } from "../testUtils.js"
import { HireWorkerOptions } from "../../src/actions/hireWorkerOptions.js"
import { Carpenter, Herder, Machinist } from "../../src/tiles.js"
import Player from "../../src/player.js"

describe("Hire Worker Options", () => {
	it("should present 4 workers at the start of the game if player has enough coin", () => {
		const { gameBoard, one } = gameBoardWithFourPlayers()
		expect(new HireWorkerOptions(-2).resolve(gameBoard, one)).toHaveLength(8)
	})

	it("should not allow options if player already has 6 workers of each type", () => {
		const { gameBoard, one } = gameBoardWithFourPlayers()

		hire6WorkersOfEachType(one)
		expect(new HireWorkerOptions(-2).resolve(gameBoard, one)).toHaveLength(0)
	})
})

const hire6WorkersOfEachType = (player: Player) => {
	new Array(6).fill(0).forEach((_) => {
		;[new Machinist(), new Carpenter(), new Herder()].forEach((worker) => {
			player.hireWorker(worker)
		})
	})
}
