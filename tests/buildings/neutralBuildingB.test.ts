import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { NeutralBuildingB } from "../../src/buildings/neutralBuildingB.js"
import GameBoard from "../../src/gameBoard.js"
import RandomPlayer from "../../src/randomplayer.js"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { Patagonico } from "../../src/cards.js"
import { CostBenefitCombinedOptions } from "../../src/actions/costBenefitCombinedOptions.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Neutral Building B", () => {
	it("should list discard Patagonico action if player has the card on their hand", () => {
		const neutralBuildingB = new NeutralBuildingB()
		const gameBoard = new GameBoard()
		const player = new RandomPlayer("Test", GameBoard.START, [new Patagonico()], [])
		player.drawCards(1)
		const availableActions = neutralBuildingB.options(gameBoard, player)
		deepEqual(availableActions, [
			new AuxiliaryActionOptions(),
			new CostBenefitCombinedOptions(new DiscardCardOptions(new Patagonico()), new GainCoinOption(2)),
		])
	})

	it("should only list one auxiliary action if player has no Patagonico on their hand and no coins", () => {
		const neutralBuildingB = new NeutralBuildingB()
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		deepEqual(neutralBuildingB.options(gameBoard, one), [new AuxiliaryActionOptions()])
	})
})
