import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { NeutralBuildingA } from "../../src/buildings/neutralBuildingA.js"
import GameBoard from "../../src/gameBoard.js"
import RandomPlayer from "../../src/randomplayer.js"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { HolandoArgentino } from "../../src/cards.js"
import { CostBenefitCombinedOptions } from "../../src/actions/costBenefitCombinedOptions.js"
import { HireWorkerOptions } from "../../src/actions/hireWorkerOptions.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Neutral Building A", () => {
	it("should list discard Holando Argentino action if player has the card on their hand", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", GameBoard.START, [new HolandoArgentino()], [])
		player.drawCards(1)
		const availableActions = neutralBuildingA.options(gameBoard, player)
		deepEqual(availableActions, [
			new AuxiliaryActionOptions(neutralBuildingA),
			new CostBenefitCombinedOptions(new DiscardCardOptions(new HolandoArgentino()), new GainCoinOption(2), neutralBuildingA),
		])
	})

	it("should list one hire worker action if player only has coins for one", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", GameBoard.START, [], [])
		player.gainCoins(7)
		const availableActions = neutralBuildingA.options(gameBoard, player)
		deepEqual(availableActions, [new AuxiliaryActionOptions(neutralBuildingA), new HireWorkerOptions(0, neutralBuildingA)])
	})

	it("should list two hire worker actions if player has enough coins for both", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", GameBoard.START, [], [])
		player.gainCoins(20)
		const availableActions = neutralBuildingA.options(gameBoard, player)
		deepEqual(availableActions, [
			new AuxiliaryActionOptions(neutralBuildingA),
			new HireWorkerOptions(0, neutralBuildingA),
			new HireWorkerOptions(2, neutralBuildingA),
		])
	})

	it("should only list one auxiliary action if player has no Holando Argentino on their hand and no coins", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", GameBoard.START, [], [])
		deepEqual(neutralBuildingA.options(gameBoard, player), [new AuxiliaryActionOptions(neutralBuildingA)])
	})
})
