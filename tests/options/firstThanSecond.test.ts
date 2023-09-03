import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AberdeenAngus, HolandoArgentino, Niata, Patagonico, Serrano } from "../../src/cards.js"
import { FirstThanSecondsOption } from "../../src/options/firstThanSecondOption.js"
import { DrawCardOption } from "../../src/options/drawCardOption.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import GameBoard from "../../src/gameBoard.js"
import RandomPlayer from "../../src/randomplayer.js"
import { DiscardCardOption } from "../../src/options/discardCardOption.js"

describe("First Then Second Option", () => {
	it("should take the result of the first option into account for the second option", () => {
		const gameBoard = new GameBoard()
		const one = new RandomPlayer("One", GameBoard.START, [new AberdeenAngus(7)], [])
		one.handCards.push(new Niata())
		one.handCards.push(new HolandoArgentino())
		one.handCards.push(new Serrano())
		one.handCards.push(new Patagonico())
		const availableOptionsForSecond = new FirstThanSecondsOption(new DrawCardOption(), new DiscardCardOptions()).resolve(gameBoard, one)
		deepEqual(availableOptionsForSecond, [
			new DiscardCardOption(new Niata()),
			new DiscardCardOption(new HolandoArgentino()),
			new DiscardCardOption(new Serrano()),
			new DiscardCardOption(new Patagonico()),
			new DiscardCardOption(new AberdeenAngus(7)),
		])
	})
})
