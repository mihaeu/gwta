import { describe, it } from "node:test"
import { gameBoardWithTwoPlayers, removeFarmersFromBoard } from "../testUtils.js"
import { HelpFarmerOption } from "../../src/options/helpFarmerOption.js"
import { BlueFarmer, GreenFarmer, HandColor, OrangeFarmer } from "../../src/tiles.js"
import { Caracu } from "../../src/cards.js"
import { deepEqual } from "node:assert"
import { equal } from "node:assert/strict"

describe("Help Farmer Option", () => {
	it("should remove all farmers from the game board and add them to the player", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
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
		one["_handCards"] = [new Caracu(3), new Caracu(3)]
		const option = new HelpFarmerOption(farmerLocations, [new Caracu(3), new Caracu(3)])
		option.resolve(gameBoard, one)

		equal(gameBoard.orangeFarmers[0].isEmpty(), true)
		equal(gameBoard.blueFarmers[0].isEmpty(), true)
		equal(gameBoard.greenFarmers[0].isEmpty(), true)
		deepEqual(one["_helpedFarmers"], [orangeFarmer, blueFarmer, greenFarmer])
		deepEqual(one.discardedCards, [new Caracu(3), new Caracu(3)])
	})
})
