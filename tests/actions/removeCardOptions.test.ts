import { describe, it } from "bun:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AberdeenAngus, AnyCard, AnyCowCard, HolandoArgentino, Niata, Objective, Patagonico } from "../../src/cards.js"
import { CompoundOption } from "../../src/options/compoundOption.js"
import { RemoveCardOption } from "../../src/options/removeCardOption.js"
import { RemoveCardOptions } from "../../src/actions/removeCardOptions.js"

describe("Remove Card Options", () => {
	it("should present all cow cards on hand if none is specified", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new HolandoArgentino())
		one.handCards.push(new Niata())
		one.handCards.push(new Objective())
		deepEqual(new RemoveCardOptions(new AnyCowCard()).resolve(gameBoard, one), [
			new RemoveCardOption(new Patagonico()),
			new RemoveCardOption(new AberdeenAngus(7)),
			new RemoveCardOption(new HolandoArgentino()),
			new RemoveCardOption(new Niata()),
		])
	})

	it("should present all hand cards that were specified", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		deepEqual(new RemoveCardOptions(new AberdeenAngus(5)).resolve(gameBoard, one), [new RemoveCardOption(new AberdeenAngus(7))])
	})

	it("should present options for removing multiple cards", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		deepEqual(new RemoveCardOptions(new AnyCard(), 2).resolve(gameBoard, one), [
			new CompoundOption(new RemoveCardOption(new AberdeenAngus(7)), new RemoveCardOption(new AberdeenAngus(7))),
			new CompoundOption(new RemoveCardOption(new AberdeenAngus(7)), new RemoveCardOption(new Patagonico())),
			new CompoundOption(new RemoveCardOption(new Patagonico()), new RemoveCardOption(new Patagonico())),
		])
	})
})
