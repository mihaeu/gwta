import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { HolandoArgentino, Patagonico } from "../../src/cards.js"
import { DrawCardOption } from "../../src/options/drawCardOption.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { FirstThanSecondsOption } from "../../src/options/firstThanSecond.js"
import { DiscardCardAction } from "../../src/actions/discardCardAction.js"

describe("Auxiliary Action", () => {
	it("should list gain coins and draw card discard card action", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new HolandoArgentino())
		deepEqual(new AuxiliaryAction().options(gameBoard, one), [
			new FirstThanSecondsOption(new DrawCardOption(), new DiscardCardAction()),
			new GainCoinOption(1),
		])
	})
})
