import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { NeutralBuildingH } from "../../src/buildings/neutralBuildingH.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { BlueFarmer, HandColor } from "../../src/tiles.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"
import { OrOption } from "../../src/options/orOption.js"
import { RemoveCardOption } from "../../src/options/removeCardOption.js"
import { ExhaustionCard } from "../../src/cards.js"

describe("Neutral Building H", () => {
	it("should only show remove exhaustion card option if there is one on player's hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const neutralBuildingG = new NeutralBuildingH()
		deepEqual(neutralBuildingG.options(gameBoard, one), [new AuxiliaryActionOptions()])
	})

	it("should show gain grain action if player hired farmers", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const neutralBuildingG = new NeutralBuildingH()
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		deepEqual(neutralBuildingG.options(gameBoard, one), [new GainGrainOption(3), new AuxiliaryActionOptions()])
	})

	it("should show gain grain action and remove exhaustion card options if all conditions are met", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const neutralBuildingG = new NeutralBuildingH()
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.hireWorker(new BlueFarmer(HandColor.BLACK, 3))
		one.handCards.push(new ExhaustionCard())
		deepEqual(neutralBuildingG.options(gameBoard, one), [
			new GainGrainOption(3),
			new OrOption(new RemoveCardOption(new ExhaustionCard()), new AuxiliaryActionOptions()),
		])
	})
})
