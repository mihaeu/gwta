// @ts-ignore
import { describe, expect, it } from "bun:test"
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

	it("should not list options on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
	})

	it("should be allowed to get all actions if player is owner", () => {
		one.handCards.push(new Niata())
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([
			new GainCoinOption(3),
			new CostBenefitCombinedOptions(new DiscardCardOptions(new AnyCowCard()), new TakeCardFromCowMarketOptions()),
		])
	})
})
