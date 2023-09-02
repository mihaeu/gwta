import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { NeutralBuildingB } from "../../src/buildings/neutralBuildingB.js"
import GameBoard from "../../src/gameBoard.js"
import RandomPlayer from "../../src/randomplayer.js"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { Patagonico } from "../../src/cards.js"
import { CostBenefitCombinedAction } from "../../src/actions/costBenefitCombinedAction.js"
import { DiscardCardAction } from "../../src/actions/discardCardAction.js"
import { GainCoinAction } from "../../src/actions/gainCoinAction.js"

describe("Neutral Building B", () => {
	it("should list discard Patagonico action if player has the card on their hand", () => {
		const neutralBuildingB = new NeutralBuildingB()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", gameBoard.start, [new Patagonico()], [])
		player.drawCards(1)
		const availableActions = neutralBuildingB.actions(gameBoard, player)
		deepEqual(availableActions, [
			new AuxiliaryAction(),
			new CostBenefitCombinedAction(new DiscardCardAction(new Patagonico()), new GainCoinAction(2)),
		])
	})

	it("should only list one auxiliary action if player has no Patagonico on their hand and no coins", () => {
		const neutralBuildingB = new NeutralBuildingB()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", gameBoard.start, [], [])
		deepEqual(neutralBuildingB.actions(gameBoard, player), [new AuxiliaryAction()])
	})
})
