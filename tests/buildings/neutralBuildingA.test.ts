import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { NeutralBuildingA } from "../../src/buildings/neutralBuildingA.js"
import GameBoard from "../../src/gameBoard.js"
import RandomPlayer from "../../src/randomplayer.js"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { HolandoArgentino } from "../../src/cards.js"
import { CostBenefitCombinedAction } from "../../src/actions/costBenefitCombinedAction.js"
import { HireWorkerAction } from "../../src/actions/hireWorkerAction.js"
import { DiscardCardAction } from "../../src/actions/discardCardAction.js"
import { GainCoinAction } from "../../src/actions/gainCoinAction.js"

describe("Neutral Building A", () => {
	it("should list discard Holando Argentino action if player has the card on their hand", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", gameBoard.start, [new HolandoArgentino()], [])
		player.drawCards(1)
		const availableActions = neutralBuildingA.actions(gameBoard, player)
		deepEqual(availableActions, [
			new AuxiliaryAction(),
			new CostBenefitCombinedAction(new DiscardCardAction(new HolandoArgentino()), new GainCoinAction(2)),
		])
	})

	it("should list one hire worker action if player only has coins for one", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", gameBoard.start, [], [])
		player.gainCoins(7)
		const availableActions = neutralBuildingA.actions(gameBoard, player)
		deepEqual(availableActions, [new AuxiliaryAction(), new HireWorkerAction()])
	})

	it("should list two hire worker actions if player has enough coins for both", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", gameBoard.start, [], [])
		player.gainCoins(20)
		const availableActions = neutralBuildingA.actions(gameBoard, player)
		deepEqual(availableActions, [new AuxiliaryAction(), new HireWorkerAction(), new HireWorkerAction(2)])
	})

	it("should only list one auxiliary action if player has no Holando Argentino on their hand and no coins", () => {
		const neutralBuildingA = new NeutralBuildingA()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", gameBoard.start, [], [])
		deepEqual(neutralBuildingA.actions(gameBoard, player), [new AuxiliaryAction()])
	})
})
