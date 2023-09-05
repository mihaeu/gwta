import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AberdeenAngus, AnyCard, AnyCowCard, HolandoArgentino, Niata, Objective, Patagonico } from "../../src/cards.js"
import { DiscardCardOption } from "../../src/options/discardCardOption.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { CompoundOption } from "../../src/options/compoundOption.js"

describe("Discard Card Options", () => {
	it("should present all cow cards on hand if none is specified", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new HolandoArgentino())
		one.handCards.push(new Niata())
		one.handCards.push(new Objective())
		deepEqual(new DiscardCardOptions(new AnyCowCard()).resolve(gameBoard, one), [
			new DiscardCardOption(new Patagonico()),
			new DiscardCardOption(new AberdeenAngus(7)),
			new DiscardCardOption(new HolandoArgentino()),
			new DiscardCardOption(new Niata()),
		])
	})

	it("should present all hand cards that were specified", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		deepEqual(new DiscardCardOptions(new AberdeenAngus(5)).resolve(gameBoard, one), [new DiscardCardOption(new AberdeenAngus(7))])
	})

	it("should present options for discarding multiple cards", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new Patagonico())
		one.handCards.push(new Patagonico())
		deepEqual(new DiscardCardOptions(new AnyCard(), 2).resolve(gameBoard, one), [
			new CompoundOption(new DiscardCardOption(new AberdeenAngus(7)), new DiscardCardOption(new AberdeenAngus(7))),
			new CompoundOption(new DiscardCardOption(new AberdeenAngus(7)), new DiscardCardOption(new Patagonico())),
			new CompoundOption(new DiscardCardOption(new Patagonico()), new DiscardCardOption(new Patagonico())),
		])
	})
})
