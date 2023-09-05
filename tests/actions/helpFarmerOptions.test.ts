import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers, removeFarmersFromBoard } from "../testUtils.js"
import { HelpFarmerOptions } from "../../src/actions/helpFarmerOptions.js"
import { HelpFarmerOption } from "../../src/options/helpFarmerOption.js"
import { Caracu, Patagonico } from "../../src/cards.js"
import { BlueFarmer, HandColor } from "../../src/tiles.js"

describe("Help Farmer Options", () => {
	it("should present all cow cards on hand if none is specified", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		removeFarmersFromBoard(gameBoard)
		gameBoard.greenFarmers[0].addFarmer(new BlueFarmer(HandColor.BLACK, 4))

		const options = new HelpFarmerOptions(0).resolve(gameBoard, one)
		deepEqual(options, [
			new HelpFarmerOption([gameBoard.greenFarmers[0]], [new Patagonico(), new Patagonico()]),
			new HelpFarmerOption([gameBoard.greenFarmers[0]], [new Patagonico(), new Patagonico(), new Patagonico()]),
			new HelpFarmerOption([gameBoard.greenFarmers[0]], [new Patagonico(), new Patagonico(), new Patagonico(), new Patagonico()]),
		])
	})

	it("should not present options if there are no farmers", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Caracu(3))
		one.handCards.push(new Caracu(3))
		one.handCards.push(new Caracu(3))
		removeFarmersFromBoard(gameBoard)

		deepEqual(new HelpFarmerOptions(0).resolve(gameBoard, one), [])
	})
})
