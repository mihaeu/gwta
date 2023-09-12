// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers, removeFarmersFromBoard, setUpThreeFarmersWithTotalStrengthOf9 } from "../testUtils.js"
import { HelpFarmerOption } from "../../src/options/helpFarmerOption.js"
import { Carpenter, Herder } from "../../src/tiles.js"
import { Caracu, ExhaustionCard, Niata } from "../../src/cards.js"
import { HandColor, YellowFarmer } from "../../src/farmer.js"

describe("Help Farmer Option", () => {
	it("should remove all farmers from the game board and add them to the player", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const { orangeFarmer, greenFarmer, blueFarmer, farmerLocations } = setUpThreeFarmersWithTotalStrengthOf9(gameBoard)

		one.hireWorker(new Carpenter(true))
		one.hireWorker(new Carpenter(true))
		one.hireWorker(new Carpenter(true))
		one.hireWorker(new Carpenter(true))
		one.hireWorker(new Carpenter(true))
		one.hireWorker(new Carpenter(true))
		one.hireWorker(new Herder(true))
		one.hireWorker(new Herder(true))
		one.hireWorker(new Herder(true))
		const option = new HelpFarmerOption(farmerLocations, [])
		option.resolve(gameBoard, one)

		expect(gameBoard.orangeFarmers[0].isEmpty()).toBeTrue()
		expect(gameBoard.blueFarmers[0].isEmpty()).toBeTrue()
		expect(gameBoard.greenFarmers[0].isEmpty()).toBeTrue()
		expect(one["_helpedFarmers"]).toEqual([orangeFarmer, blueFarmer, greenFarmer])
		expect(one.discardedCards).toHaveLength(0)
	})

	it("should add one exhaustion card if two cows were used", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const { orangeFarmer, greenFarmer, blueFarmer, farmerLocations } = setUpThreeFarmersWithTotalStrengthOf9(gameBoard)

		one["_handCards"] = [new Caracu(3), new Caracu(3)]

		const option = new HelpFarmerOption(farmerLocations, [new Caracu(3), new Caracu(3)])
		option.resolve(gameBoard, one)

		expect(gameBoard.orangeFarmers[0].isEmpty()).toBeTrue()
		expect(gameBoard.blueFarmers[0].isEmpty()).toBeTrue()
		expect(gameBoard.greenFarmers[0].isEmpty()).toBeTrue()
		expect(one["_helpedFarmers"]).toEqual([orangeFarmer, blueFarmer, greenFarmer])
		expect(one.discardedCards).toEqual([new Caracu(3), new Caracu(3), new ExhaustionCard()])
	})

	it("should add two exhaustion cards if three cows were used", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const { orangeFarmer, greenFarmer, blueFarmer, farmerLocations } = setUpThreeFarmersWithTotalStrengthOf9(gameBoard)

		one["_handCards"] = [new Caracu(3), new Caracu(3), new Niata()]

		const option = new HelpFarmerOption(farmerLocations, [new Caracu(3), new Caracu(3), new Niata()])
		option.resolve(gameBoard, one)

		expect(gameBoard.orangeFarmers[0].isEmpty()).toBeTrue()
		expect(gameBoard.blueFarmers[0].isEmpty()).toBeTrue()
		expect(gameBoard.greenFarmers[0].isEmpty()).toBeTrue()
		expect(one["_helpedFarmers"]).toEqual([orangeFarmer, blueFarmer, greenFarmer])
		expect(one.discardedCards).toEqual([new Caracu(3), new Caracu(3), new Niata(), new ExhaustionCard(), new ExhaustionCard()])
	})

	it("should receive gold from helping farmers", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		removeFarmersFromBoard(gameBoard)
		const yellowFarmer1 = new YellowFarmer(HandColor.BLACK, 3)
		const yellowFarmer2 = new YellowFarmer(HandColor.BLACK, 3)
		gameBoard.yellowFarmers[6].addFarmer(yellowFarmer1)
		gameBoard.yellowFarmers[5].addFarmer(yellowFarmer2)
		const farmerLocations = [gameBoard.yellowFarmers[6], gameBoard.yellowFarmers[5]]

		one["_handCards"] = [new Caracu(3), new Caracu(3), new Niata()]

		const option = new HelpFarmerOption(farmerLocations, [new Caracu(3), new Caracu(3), new Niata()])
		option.resolve(gameBoard, one)

		expect(one["_helpedFarmers"]).toEqual([yellowFarmer1, yellowFarmer2])
		expect(one.coins).toBe(7 + 11)
		expect(one.discardedCards).toEqual([new Caracu(3), new Caracu(3), new Niata(), new ExhaustionCard(), new ExhaustionCard()])
	})
})
