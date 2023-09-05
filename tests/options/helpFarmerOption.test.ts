import { describe, it } from "node:test"
import { gameBoardWithTwoPlayers, removeFarmersFromBoard } from "../testUtils.js"
import { HelpFarmerOption } from "../../src/options/helpFarmerOption.js"
import { BlueFarmer, Carpenter, GreenFarmer, HandColor, Herder, OrangeFarmer } from "../../src/tiles.js"
import { Caracu, ExhaustionCard, Niata } from "../../src/cards.js"
import { deepEqual } from "node:assert"
import { equal } from "node:assert/strict"
import GameBoard from "../../src/gameBoard.js"

describe("Help Farmer Option", () => {
	it("should remove all farmers from the game board and add them to the player", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
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
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
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
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
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
})

const setUpThreeFarmersWithTotalStrengthOf9 = (gameBoard: GameBoard) => {
	removeFarmersFromBoard(gameBoard)
	const orangeFarmer = new OrangeFarmer(HandColor.BLACK, 3)
	gameBoard.orangeFarmers[0].addFarmer(orangeFarmer)
	equal(gameBoard.orangeFarmers[0].isEmpty(), false)
	const greenFarmer = new GreenFarmer(HandColor.BLACK, 3)
	gameBoard.greenFarmers[0].addFarmer(greenFarmer)
	equal(gameBoard.greenFarmers[0].isEmpty(), false)
	const blueFarmer = new BlueFarmer(HandColor.BLACK, 3)
	gameBoard.blueFarmers[0].addFarmer(blueFarmer)
	equal(gameBoard.blueFarmers[0].isEmpty(), false)
	const farmerLocations = [gameBoard.orangeFarmers[0], gameBoard.greenFarmers[0], gameBoard.blueFarmers[0]]
	return { orangeFarmer, greenFarmer, blueFarmer, farmerLocations }
}
