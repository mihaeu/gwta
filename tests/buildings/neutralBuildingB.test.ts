import { describe, expect, it } from "bun:test"
import { NeutralBuildingB } from "../../src/buildings/neutralBuildingB.js"
import { Patagonico } from "../../src/cards.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { OneByOneOption } from "../../src/options/oneByOneOption.js"

describe("Neutral Building B", () => {
	it("should list discard Patagonico action if player has the card on their hand", () => {
		const neutralBuildingB = new NeutralBuildingB()
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new Patagonico())
		one.pay(7)
		const availableActions = neutralBuildingB.options(gameBoard, one)
		expect(availableActions).toEqual([new OneByOneOption(new GainCoinOption(2), new DiscardCardOptions(new Patagonico()))])
	})

	it("should not list options if player has no Patagonico on their hand and no coins", () => {
		const neutralBuildingB = new NeutralBuildingB()
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.pay(7)
		expect(neutralBuildingB.options(gameBoard, one)).toHaveLength(0)
	})
})
