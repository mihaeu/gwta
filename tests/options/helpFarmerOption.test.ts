import { describe, it } from "bun:test"
import { gameBoardWithTwoPlayers, removeFarmersFromBoard, setUpThreeFarmersWithTotalStrengthOf9 } from "../testUtils.js"
import { HelpFarmerOption } from "../../src/options/helpFarmerOption.js"
import { Carpenter, Herder } from "../../src/tiles.js"
import { Caracu, ExhaustionCard, Niata } from "../../src/cards.js"
import { deepEqual } from "node:assert"
import { equal } from "node:assert/strict"
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

		equal(gameBoard.orangeFarmers[0].isEmpty(), true)
		equal(gameBoard.blueFarmers[0].isEmpty(), true)
		equal(gameBoard.greenFarmers[0].isEmpty(), true)
		deepEqual(one["_helpedFarmers"], [orangeFarmer, blueFarmer, greenFarmer])
		deepEqual(one.discardedCards, [])
	})

	it("should add one exhaustion card if two cows were used", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const { orangeFarmer, greenFarmer, blueFarmer, farmerLocations } = setUpThreeFarmersWithTotalStrengthOf9(gameBoard)

		one["_handCards"] = [new Caracu(3), new Caracu(3)]

		const option = new HelpFarmerOption(farmerLocations, [new Caracu(3), new Caracu(3)])
		option.resolve(gameBoard, one)

		equal(gameBoard.orangeFarmers[0].isEmpty(), true)
		equal(gameBoard.blueFarmers[0].isEmpty(), true)
		equal(gameBoard.greenFarmers[0].isEmpty(), true)
		deepEqual(one["_helpedFarmers"], [orangeFarmer, blueFarmer, greenFarmer])
		deepEqual(one.discardedCards, [new Caracu(3), new Caracu(3), new ExhaustionCard()])
	})

	it("should add two exhaustion cards if three cows were used", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const { orangeFarmer, greenFarmer, blueFarmer, farmerLocations } = setUpThreeFarmersWithTotalStrengthOf9(gameBoard)

		one["_handCards"] = [new Caracu(3), new Caracu(3), new Niata()]

		const option = new HelpFarmerOption(farmerLocations, [new Caracu(3), new Caracu(3), new Niata()])
		option.resolve(gameBoard, one)

		equal(gameBoard.orangeFarmers[0].isEmpty(), true)
		equal(gameBoard.blueFarmers[0].isEmpty(), true)
		equal(gameBoard.greenFarmers[0].isEmpty(), true)
		deepEqual(one["_helpedFarmers"], [orangeFarmer, blueFarmer, greenFarmer])
		deepEqual(one.discardedCards, [new Caracu(3), new Caracu(3), new Niata(), new ExhaustionCard(), new ExhaustionCard()])
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

		deepEqual(one["_helpedFarmers"], [yellowFarmer1, yellowFarmer2])
		deepEqual(one.coins, 11)
		deepEqual(one.discardedCards, [new Caracu(3), new Caracu(3), new Niata(), new ExhaustionCard(), new ExhaustionCard()])
	})
})
