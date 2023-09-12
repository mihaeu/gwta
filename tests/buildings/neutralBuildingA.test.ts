// @ts-ignore
import { describe, expect, it } from "bun:test"
import { NeutralBuildingA } from "../../src/buildings/neutralBuildingA.js"
import GameBoard from "../../src/gameBoard.js"
import RandomPlayer from "../../src/randomPlayer.js"
import { HolandoArgentino } from "../../src/cards.js"
import { CostBenefitCombinedOptions } from "../../src/actions/costBenefitCombinedOptions.js"
import { HireWorkerOptions } from "../../src/actions/hireWorkerOptions.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"

describe("Neutral Building A", () => {
	it("should list discard Holando Argentino action if player has the card on their hand", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.pay(7)
		one.handCards.push(new HolandoArgentino())
		const availableActions = neutralBuildingA.options(gameBoard, one)
		expect(availableActions).toEqual([
			new CostBenefitCombinedOptions(new DiscardCardOptions(new HolandoArgentino()), new GainCoinOption(2), neutralBuildingA),
		])
	})

	it("should list one hire worker action if player only has coins for one", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const one = new RandomPlayer("Test")
		const gameBoard = new GameBoard([one])
		one.discardCards()
		const availableActions = neutralBuildingA.options(gameBoard, one)
		expect(availableActions).toEqual([new HireWorkerOptions(0, neutralBuildingA)])
	})

	it("should list two hire worker actions if player has enough coins for both", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const one = new RandomPlayer("Test")
		const gameBoard = new GameBoard([one])
		one.gainCoins(20)
		one.discardCards()
		const availableActions = neutralBuildingA.options(gameBoard, one)
		expect(availableActions).toEqual([new HireWorkerOptions(0, neutralBuildingA), new HireWorkerOptions(2, neutralBuildingA)])
	})

	it("should have no options if player has no Holando Argentino on their hand and no coins", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const one = new RandomPlayer("Test")
		const gameBoard = new GameBoard([one])
		one.discardCards()
		one.pay(7)
		expect(neutralBuildingA.options(gameBoard, one)).toHaveLength(0)
	})
})
