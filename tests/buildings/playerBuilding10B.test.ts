import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { GainCoinAction } from "../../src/actions/gainCoinAction.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { PlayerBuilding10B } from "../../src/buildings/playerBuilding10B.js"
import { CostBenefitCombinedAction } from "../../src/actions/costBenefitCombinedAction.js"
import { DiscardCardAction } from "../../src/actions/discardCardAction.js"
import { AnyCowCard, Niata } from "../../src/cards.js"
import { TakeCardFromCowMarketAction } from "../../src/actions/takeCardFromCowMarketAction.js"

describe("Player Building 10B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding10B())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.actions(gameBoard, two), [new AuxiliaryAction()])
	})

	it("should be allowed to get all actions if player is owner", () => {
		one.handCards.push(new Niata())
		deepEqual(playerBuildingOfPlayerOne.actions(gameBoard, one), [
			new AuxiliaryAction(),
			new GainCoinAction(3),
			new CostBenefitCombinedAction(new DiscardCardAction(new AnyCowCard()), new TakeCardFromCowMarketAction()),
		])
	})
})
