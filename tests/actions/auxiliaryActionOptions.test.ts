import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { AnyCard, HolandoArgentino, Patagonico } from "../../src/cards.js"
import { DrawCardOption } from "../../src/options/drawCardOption.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { FirstThanSecondsOption } from "../../src/options/firstThanSecondOption.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { RemoveCardOption } from "../../src/options/removeCardOption.js"
import { CompoundOption } from "../../src/options/compoundOption.js"
import { CertificateOption } from "../../src/options/certificateOption.js"

describe("Auxiliary Action Options", () => {
	it("should list gain coins and draw card discard card action", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new HolandoArgentino())
		deepEqual(new AuxiliaryActionOptions().resolve(gameBoard, one), [
			new GainCoinOption(1),
			new FirstThanSecondsOption(new DrawCardOption(), new DiscardCardOptions()),
		])
	})

	it("should contain options that require coins if player has at least one coin", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new HolandoArgentino())
		one.gainCoins(1)
		deepEqual(new AuxiliaryActionOptions().resolve(gameBoard, one), [
			new GainCoinOption(1),
			new FirstThanSecondsOption(new DrawCardOption(), new DiscardCardOptions()),
			new FirstThanSecondsOption(new GainCoinOption(-1), new GainGrainOption(1)),
			new FirstThanSecondsOption(new GainCoinOption(-1), new MoveTrainOptions(1)),
			new FirstThanSecondsOption(new GainCoinOption(-1), new RemoveCardOption(new AnyCard())),
		])
	})

	it("should contain options that require grain if player has at least one grain", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new HolandoArgentino())
		one.gainGrain(1)
		deepEqual(new AuxiliaryActionOptions().resolve(gameBoard, one), [
			new GainCoinOption(1),
			new FirstThanSecondsOption(new DrawCardOption(), new DiscardCardOptions()),
			new CompoundOption(new GainGrainOption(-1), new CertificateOption(1), new GainCoinOption(1)),
		])
	})
})
