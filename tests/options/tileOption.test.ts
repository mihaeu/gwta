import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { TileOption } from "../../src/options/tileOption.js"
import { Carpenter, EmptyJobMarketSlot, JobMarketToken } from "../../src/tiles.js"
import { BlueFarmer, HandColor, YellowFarmer } from "../../src/farmer.js"

describe("Tile Option", () => {
	it("should add worker tile to the job market", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.jobMarket = [new EmptyJobMarketSlot(), new JobMarketToken()]

		const expectedWorker = new Carpenter(true)
		gameBoard.foresightSpacesA[0] = expectedWorker
		new TileOption(0, gameBoard.foresightSpacesA).resolve(gameBoard, one)
		expect(gameBoard.jobMarket).toEqual([expectedWorker, new JobMarketToken()])
	})

	it("should add farmer tile to the proper space on the board", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.blueFarmers.forEach((farmerNode) => farmerNode.helpFarmer())

		const expectedFarmer = new BlueFarmer(HandColor.BLACK, 7)
		gameBoard.foresightSpacesA[0] = expectedFarmer
		new TileOption(0, gameBoard.foresightSpacesA).resolve(gameBoard, one)
		expect(gameBoard.blueFarmers[0].helpFarmer()).toEqual(expectedFarmer)
	})

	it("should not add farmer if all slots from that color are taken", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const existingFarmer = new BlueFarmer(HandColor.BLACK, 3)
		gameBoard.blueFarmers.forEach((farmerNode) => farmerNode.addFarmer(existingFarmer))

		expect(gameBoard.blueFarmers).toHaveLength(4)
		gameBoard.foresightSpacesA[0] = new BlueFarmer(HandColor.BLACK, 7)
		new TileOption(0, gameBoard.foresightSpacesA).resolve(gameBoard, one)
		expect(gameBoard.blueFarmers).toHaveLength(4)
	})

	it("should detect if chose tile is a worker", () => {
		const { gameBoard } = gameBoardWithTwoPlayers()

		gameBoard.foresightSpacesA[0] = new Carpenter(true)
		expect(new TileOption(0, gameBoard.foresightSpacesA).isWorker()).toBeTrue()

		gameBoard.foresightSpacesA[1] = new YellowFarmer(HandColor.GREEN, 4)
		expect(new TileOption(1, gameBoard.foresightSpacesA).isWorker()).toBeFalse()
	})

	it("should detect if chose tile is a farmer", () => {
		const { gameBoard } = gameBoardWithTwoPlayers()

		gameBoard.foresightSpacesA[0] = new Carpenter(true)
		expect(new TileOption(0, gameBoard.foresightSpacesA).isFarmer()).toBeFalse()

		gameBoard.foresightSpacesA[1] = new YellowFarmer(HandColor.GREEN, 4)
		expect(new TileOption(1, gameBoard.foresightSpacesA).isFarmer()).toBeTrue()
	})
})
