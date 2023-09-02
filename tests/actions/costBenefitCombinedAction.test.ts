import { describe, it } from "node:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AnyCowCard, HolandoArgentino, Niata, Patagonico } from "../../src/cards.js"
import { equal } from "node:assert/strict"
import { CostBenefitCombinedAction } from "../../src/actions/costBenefitCombinedAction.js"
import { DiscardCardAction } from "../../src/actions/discardCardAction.js"
import { TakeCardFromCowMarketAction } from "../../src/actions/takeCardFromCowMarketAction.js"

describe("Cost Benefit Combined Action", () => {
	it("should build all combinations of costs and benefits", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		one.handCards.push(new HolandoArgentino())
		one.handCards.push(new Niata())
		one.handCards.push(new Niata())
		const cost = new DiscardCardAction(new AnyCowCard())
		const benefit = new TakeCardFromCowMarketAction()
		equal(new CostBenefitCombinedAction(cost, benefit).options(gameBoard, one).length, 27)
	})
})
