// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { HireWorkerOptions } from "../../src/actions/hireWorkerOptions.js"
import { Carpenter, Herder, JobMarketToken, Machinist } from "../../src/tiles.js"

describe("Hire Worker Options", () => {
	it("should present 4 workers at the start of the game if player has enough coin", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.jobMarket = [new Carpenter(true), new Machinist(), new Carpenter(), new Herder(true), new Herder(), new JobMarketToken()]
		expect(new HireWorkerOptions(-7).resolve(gameBoard, one)).toHaveLength(4)
	})
})
