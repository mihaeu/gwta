import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { NeutralBuildingD } from "../../src/buildings/neutralBuildingD.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { Patagonico, Serrano } from "../../src/cards.js"
import { DiscardTwoIdenticalCardsOptions } from "../../src/actions/discardTwoIdenticalCardsOptions.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { OneByOneOption } from "../../src/options/oneByOneOption.js"

describe("Neutral Building D", () => {
	it("should list discard two same cards action if cards are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Serrano())
		one.handCards.push(new Serrano())

		const neutralBuildingD = new NeutralBuildingD()
		expect(neutralBuildingD.options(gameBoard, one)).toEqual([
			new MoveTrainOptions(),
			new OneByOneOption(new GainCoinOption(2), new DiscardTwoIdenticalCardsOptions()),
		])
	})

	it("should have no actions if no identical cow cards are on the player's hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new Serrano())
		one.handCards.push(new Patagonico())

		const neutralBuildingD = new NeutralBuildingD()
		expect(neutralBuildingD.options(gameBoard, one)).toEqual([new MoveTrainOptions()])
	})
})
