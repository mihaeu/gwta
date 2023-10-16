import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers, removeFarmersFromBoard } from "../testUtils.js"
import { HelpFarmerOptions } from "../../src/actions/helpFarmerOptions.js"
import { HelpFarmerOption } from "../../src/options/helpFarmerOption.js"
import { Caracu, Patagonico } from "../../src/cards.js"
import { BlueFarmer, HandColor } from "../../src/farmer.js"

describe("Help Farmer Options", () => {
	it("should present all cow cards on hand if none is specified", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		removeFarmersFromBoard(gameBoard)
		gameBoard.greenFarmers[0].addFarmer(new BlueFarmer(HandColor.BLACK, 4))

		const options = new HelpFarmerOptions(0).resolve(gameBoard, one)
		expect(options).toEqual([
			new HelpFarmerOption([gameBoard.greenFarmers[0]], [new Patagonico(), new Patagonico()]),
			new HelpFarmerOption([gameBoard.greenFarmers[0]], [new Patagonico(), new Patagonico(), new Patagonico()]),
			new HelpFarmerOption([gameBoard.greenFarmers[0]], [new Patagonico(), new Patagonico(), new Patagonico(), new Patagonico()]),
		])
	})

	it("should not present options if there are no farmers", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new Caracu(3))
		one.handCards.push(new Caracu(3))
		one.handCards.push(new Caracu(3))
		removeFarmersFromBoard(gameBoard)

		expect(new HelpFarmerOptions(0).resolve(gameBoard, one)).toHaveLength(0)
	})

	it("should present options even if there are no cards but enough strength", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		removeFarmersFromBoard(gameBoard)
		gameBoard.greenFarmers[0].addFarmer(new BlueFarmer(HandColor.BLACK, 4))

		expect(one.handCards).toHaveLength(0)
		expect(new HelpFarmerOptions(4).resolve(gameBoard, one)).toEqual([new HelpFarmerOption([gameBoard.greenFarmers[0]], [])])
	})

	it("should not present options if player already helped 6 farmers", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.helpFarmer(new BlueFarmer(HandColor.BLACK, 3))
		one.helpFarmer(new BlueFarmer(HandColor.BLACK, 3))
		one.helpFarmer(new BlueFarmer(HandColor.BLACK, 3))
		one.helpFarmer(new BlueFarmer(HandColor.BLACK, 3))
		one.helpFarmer(new BlueFarmer(HandColor.BLACK, 3))
		one.helpFarmer(new BlueFarmer(HandColor.BLACK, 3))
		expect(new HelpFarmerOptions(4).resolve(gameBoard, one)).toBeEmpty()
	})
})
