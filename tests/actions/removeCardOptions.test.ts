import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AberdeenAngus, AnyCard, AnyCowCard, HolandoArgentino, Niata, Patagonico } from "../../src/cards.js"
import { RemoveCardOption } from "../../src/options/removeCardOption.js"
import { RemoveCardOptions } from "../../src/actions/removeCardOptions.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { Objectives } from "../../src/objectives.js"
import { ObjectiveCard } from "../../src/objectiveCard.js"
import { AllAsOneOption } from "../../src/options/allAsOneOption.js"

describe("Remove Card Options", () => {
	it("should present all cow cards on hand if none is specified", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new Patagonico())
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new HolandoArgentino())
		one.handCards.push(new Niata())
		one.handCards.push(new ObjectiveCard(1, new GainCoinOption(1), 5, -2, new Objectives()))
		expect(new RemoveCardOptions(new AnyCowCard()).resolve(gameBoard, one)).toEqual([
			new RemoveCardOption(new Patagonico()),
			new RemoveCardOption(new AberdeenAngus(7)),
			new RemoveCardOption(new HolandoArgentino()),
			new RemoveCardOption(new Niata()),
		])
	})

	it("should present all hand cards that were specified", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		expect(new RemoveCardOptions(new AberdeenAngus(5)).resolve(gameBoard, one)).toEqual([new RemoveCardOption(new AberdeenAngus(7))])
	})

	it("should present options for removing multiple cards", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		expect(new RemoveCardOptions(new AnyCard(), 2).resolve(gameBoard, one)).toEqual([
			new AllAsOneOption(new RemoveCardOption(new AberdeenAngus(7)), new RemoveCardOption(new AberdeenAngus(7))),
			new AllAsOneOption(new RemoveCardOption(new AberdeenAngus(7)), new RemoveCardOption(new Patagonico())),
			new AllAsOneOption(new RemoveCardOption(new Patagonico()), new RemoveCardOption(new Patagonico())),
		])
	})
})
