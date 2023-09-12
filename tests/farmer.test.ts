// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers, removeFarmersFromBoard } from "./testUtils.js"
import { BlueFarmer, HandColor } from "../src/farmer.js"
import { Caracu } from "../src/cards.js"
import { HelpFarmerOptions } from "../src/actions/helpFarmerOptions.js"

describe("Farmer", () => {
	it("should present no options if farmer cannot be helped", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		removeFarmersFromBoard(gameBoard)
		one.discardCards()
		const farmer = new BlueFarmer(HandColor.BLACK, 7)
		gameBoard.blueFarmers[0].addFarmer(farmer)
		one.location = gameBoard.blueFarmers[0]
		const options = farmer.options(gameBoard, one)
		expect(options).toHaveLength(0)
	})

	it("should present no options if farmer cannot be helped", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		removeFarmersFromBoard(gameBoard)
		const farmer = new BlueFarmer(HandColor.BLACK, 7)
		gameBoard.blueFarmers[0].addFarmer(farmer)
		one.location = gameBoard.blueFarmers[0]
		one.handCards.push(new Caracu(3))
		const options = farmer.options(gameBoard, one)
		expect(options).toEqual([new HelpFarmerOptions(0, gameBoard.blueFarmers[0])])
	})
})
