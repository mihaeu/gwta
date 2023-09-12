import { describe, it } from "bun:test"
import { deepEqual } from "node:assert"
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
		one.handCards.push(new HolandoArgentino())
		const availableActions = neutralBuildingA.options(gameBoard, one)
		deepEqual(availableActions, [
			new CostBenefitCombinedOptions(new DiscardCardOptions(new HolandoArgentino()), new GainCoinOption(2), neutralBuildingA),
		])
	})

	it("should list one hire worker action if player only has coins for one", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const player = new RandomPlayer("Test")
		const gameBoard = new GameBoard([player])
		player.gainCoins(7)
		const availableActions = neutralBuildingA.options(gameBoard, player)
		deepEqual(availableActions, [new HireWorkerOptions(0, neutralBuildingA)])
	})

	it("should list two hire worker actions if player has enough coins for both", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const player = new RandomPlayer("Test")
		const gameBoard = new GameBoard([player])
		player.gainCoins(20)
		const availableActions = neutralBuildingA.options(gameBoard, player)
		deepEqual(availableActions, [new HireWorkerOptions(0, neutralBuildingA), new HireWorkerOptions(2, neutralBuildingA)])
	})

	it("should have no options if player has no Holando Argentino on their hand and no coins", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const player = new RandomPlayer("Test")
		const gameBoard = new GameBoard([player])
		deepEqual(neutralBuildingA.options(gameBoard, player), [])
	})
})
