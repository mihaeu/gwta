import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { NeutralBuildingD } from "../../src/buildings/neutralBuildingD.js"
import { MoveTrainAction } from "../../src/actions/moveTrainAction.js"
import { Patagonico, Serrano } from "../../src/cards.js"
import { CostBenefitCombinedAction } from "../../src/actions/costBenefitCombinedAction.js"
import { DiscardTwoIdenticalCardsAction } from "../../src/actions/discardTwoIdenticalCardsAction.js"
import { GainCoinAction } from "../../src/actions/gainCoinAction.js"

describe("Neutral Building D", () => {
	it("should list discard two same cards action if cards are available", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Serrano())
		one.handCards.push(new Serrano())

		const neutralBuildingD = new NeutralBuildingD()
		deepEqual(neutralBuildingD.actions(gameBoard, one), [
			new AuxiliaryAction(),
			new MoveTrainAction(),
			new CostBenefitCombinedAction(new DiscardTwoIdenticalCardsAction(), new GainCoinAction(2)),
		])
	})

	it("should only list auxiliary action if no identical cow cards are on the player's hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Serrano())
		one.handCards.push(new Patagonico())

		const neutralBuildingD = new NeutralBuildingD()
		deepEqual(neutralBuildingD.actions(gameBoard, one), [new AuxiliaryAction(), new MoveTrainAction()])
	})
})
