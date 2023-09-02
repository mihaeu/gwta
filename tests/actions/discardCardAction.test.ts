import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AberdeenAngus, AnyCowCard, HolandoArgentino, Niata, Objective, Patagonico } from "../../src/cards.js"
import { DiscardCardOption } from "../../src/options/discardCardOption.js"
import { DiscardCardAction } from "../../src/actions/discardCardAction.js"

describe("Discard Card Action", () => {
	it("should all cow cards on hand if none is specified", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new AberdeenAngus(7))
		one.handCards.push(new HolandoArgentino())
		one.handCards.push(new Niata())
		one.handCards.push(new Objective())
		deepEqual(new DiscardCardAction(new AnyCowCard()).options(gameBoard, one), [
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
		deepEqual(new DiscardCardAction(new AberdeenAngus(5)).options(gameBoard, one), [
			new DiscardCardOption(new AberdeenAngus(7)),
			new DiscardCardOption(new AberdeenAngus(7)),
		])
	})
})
