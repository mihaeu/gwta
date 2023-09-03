import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { NeutralBuildingD } from "../../src/buildings/neutralBuildingD.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { Patagonico, Serrano } from "../../src/cards.js"
import { CostBenefitCombinedOptions } from "../../src/actions/costBenefitCombinedOptions.js"
import { DiscardTwoIdenticalCardsOptions } from "../../src/actions/discardTwoIdenticalCardsOptions.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Neutral Building D", () => {
	it("should list discard two same cards action if cards are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Serrano())
		one.handCards.push(new Serrano())

		const neutralBuildingD = new NeutralBuildingD()
		deepEqual(neutralBuildingD.options(gameBoard, one), [
			new AuxiliaryActionOptions(),
			new MoveTrainOptions(),
			new CostBenefitCombinedOptions(new DiscardTwoIdenticalCardsOptions(), new GainCoinOption(2)),
		])
	})

	it("should only list auxiliary action if no identical cow cards are on the player's hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Serrano())
		one.handCards.push(new Patagonico())

		const neutralBuildingD = new NeutralBuildingD()
		deepEqual(neutralBuildingD.options(gameBoard, one), [new AuxiliaryActionOptions(), new MoveTrainOptions()])
	})
})
