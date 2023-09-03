import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { PlayerBuilding10B } from "../../src/buildings/playerBuilding10B.js"
import { CostBenefitCombinedOptions } from "../../src/actions/costBenefitCombinedOptions.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { AnyCowCard, Niata } from "../../src/cards.js"
import { TakeCardFromCowMarketOptions } from "../../src/actions/takeCardFromCowMarketOptions.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Player Building 10B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding10B())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [new AuxiliaryActionOptions()])
	})

	it("should be allowed to get all actions if player is owner", () => {
		one.handCards.push(new Niata())
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [
			new AuxiliaryActionOptions(),
			new GainCoinOption(3),
			new CostBenefitCombinedOptions(new DiscardCardOptions(new AnyCowCard()), new TakeCardFromCowMarketOptions()),
		])
	})
})
