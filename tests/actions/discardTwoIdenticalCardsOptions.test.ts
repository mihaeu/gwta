import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { DiscardTwoIdenticalCardsOptions } from "../../src/actions/discardTwoIdenticalCardsOptions.js"
import { AberdeenAngus, Patagonico } from "../../src/cards.js"
import { DiscardCardOption } from "../../src/options/discardCardOption.js"
import { AllAsOneOption } from "../../src/options/allAsOneOption.js"

describe("Discard Two Identical Cards Options", () => {
	it("should present one option if player has four identical cards", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new AberdeenAngus(7))
		expect(new DiscardTwoIdenticalCardsOptions().resolve(gameBoard, one)).toEqual([
			new AllAsOneOption(new DiscardCardOption(new AberdeenAngus(7)), new DiscardCardOption(new AberdeenAngus(7))),
		])
	})

	it("should present two options if player has two sets of duplicate cards", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		expect(new DiscardTwoIdenticalCardsOptions().resolve(gameBoard, one)).toEqual([
			new AllAsOneOption(new DiscardCardOption(new AberdeenAngus(7)), new DiscardCardOption(new AberdeenAngus(7))),
			new AllAsOneOption(new DiscardCardOption(new Patagonico()), new DiscardCardOption(new Patagonico())),
		])
	})
})
