import { describe, it } from "node:test"
import { gameBoardWithTwoPlayers, removeFarmersFromBoard } from "./testUtils.js"
import { BlueFarmer, HandColor } from "../src/farmer.js"
import { deepEqual } from "node:assert"
import { Caracu } from "../src/cards.js"
import { HelpFarmerOptions } from "../src/actions/helpFarmerOptions.js"

describe("Farmer", () => {
	it("should present no options if farmer cannot be helped", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		removeFarmersFromBoard(gameBoard)
		const farmer = new BlueFarmer(HandColor.BLACK, 7)
		gameBoard.blueFarmers[0].addFarmer(farmer)
		one.location = gameBoard.blueFarmers[0]
		const options = farmer.options(gameBoard, one)
		deepEqual(options, [])
	})

	it("should present no options if farmer cannot be helped", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		removeFarmersFromBoard(gameBoard)
		const farmer = new BlueFarmer(HandColor.BLACK, 7)
		gameBoard.blueFarmers[0].addFarmer(farmer)
		one.location = gameBoard.blueFarmers[0]
		one.handCards.push(new Caracu(3))
		const options = farmer.options(gameBoard, one)
		deepEqual(options, [new HelpFarmerOptions(0, gameBoard.blueFarmers[0])])
	})
})
