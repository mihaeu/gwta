import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { Fronterizo, Serrano } from "../../src/cards.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { NeutralBuildingE } from "../../src/buildings/neutralBuildingE.js"
import { DiscardCardOption } from "../../src/options/discardCardOption.js"
import { BuyCowOption } from "../../src/options/buyCowOption.js"
import { AllAsOneOption } from "../../src/options/allAsOneOption.js"

describe("Neutral Building E", () => {
	it("should only list discard option if it exists", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const neutralBuildingE = new NeutralBuildingE()

		one.discardCards()
		one.gainCoins(-7)
		expect(neutralBuildingE.options(gameBoard, one)).toBeEmpty()

		one.handCards.push(new Fronterizo())
		expect(neutralBuildingE.options(gameBoard, one)).toEqual([
			new AllAsOneOption(new GainCoinOption(2), new DiscardCardOption(new Fronterizo())),
		])
	})

	it("should list cow options", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const neutralBuildingE = new NeutralBuildingE()
		gameBoard.cowMarket = [new Serrano()]

		one.discardCards()
		expect(neutralBuildingE.options(gameBoard, one)).toEqual([new BuyCowOption(new Serrano(), 5)])
	})
})
