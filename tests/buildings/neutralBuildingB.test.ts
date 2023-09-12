// @ts-ignore
import { describe, expect, it } from "bun:test"
import { NeutralBuildingB } from "../../src/buildings/neutralBuildingB.js"
import { Patagonico } from "../../src/cards.js"
import { CostBenefitCombinedOptions } from "../../src/actions/costBenefitCombinedOptions.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Neutral Building B", () => {
	it("should list discard Patagonico action if player has the card on their hand", () => {
		const neutralBuildingB = new NeutralBuildingB()
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Patagonico())
		const availableActions = neutralBuildingB.options(gameBoard, one)
		expect(availableActions).toEqual([new CostBenefitCombinedOptions(new DiscardCardOptions(new Patagonico()), new GainCoinOption(2))])
	})

	it("should not list options if player has no Patagonico on their hand and no coins", () => {
		const neutralBuildingB = new NeutralBuildingB()
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(neutralBuildingB.options(gameBoard, one)).toHaveLength(0)
	})
})
