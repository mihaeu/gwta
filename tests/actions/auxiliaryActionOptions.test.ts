import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { HolandoArgentino, Patagonico } from "../../src/cards.js"
import { DrawCardOption } from "../../src/options/drawCardOption.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { FirstThanSecondsOption } from "../../src/options/firstThanSecondOption.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"

describe("Auxiliary Action Options", () => {
	it("should list gain coins and draw card discard card action", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new HolandoArgentino())
		deepEqual(new AuxiliaryActionOptions().resolve(gameBoard, one), [
			new FirstThanSecondsOption(new DrawCardOption(), new DiscardCardOptions()),
			new GainCoinOption(1),
		])
	})
})
