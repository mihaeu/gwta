import { describe, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AnyCowCard, HolandoArgentino, Niata, Patagonico } from "../../src/cards.js"
import { equal } from "node:assert/strict"
import { CostBenefitCombinedOptions } from "../../src/actions/costBenefitCombinedOptions.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { TakeCardFromCowMarketOptions } from "../../src/actions/takeCardFromCowMarketOptions.js"

describe("Cost Benefit Combined Options", () => {
	it("should build all combinations of costs and benefits", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new HolandoArgentino())
		one.handCards.push(new Niata())
		one.handCards.push(new Niata())
		const cost = new DiscardCardOptions(new AnyCowCard())
		const benefit = new TakeCardFromCowMarketOptions()
		equal(new CostBenefitCombinedOptions(cost, benefit).resolve(gameBoard, one).length, 27)
	})
})
