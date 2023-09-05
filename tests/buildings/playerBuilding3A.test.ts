import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers, gameBoardWithTwoPlayersAndBuildings, setUpThreeFarmersWithTotalStrengthOf9 } from "../testUtils.js"
import { PlayerBuilding3A } from "../../src/buildings/playerBuilding3A.js"
import { GainExchangeTokenOption } from "../../src/options/gainExchangeTokenOption.js"
import { Caracu } from "../../src/cards.js"
import { HelpFarmerOptions } from "../../src/actions/helpFarmerOptions.js"

describe("Player Building 3A", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding3A())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should not have options on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
		deepEqual(playerBuildingOfPlayerTwo.options(gameBoard, one), [])
	})

	it("should be be able to get exchange token option", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new GainExchangeTokenOption()])
	})

	it("should be be able to a help farmer option if options for that exist", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		setUpThreeFarmersWithTotalStrengthOf9(gameBoard)
		one.handCards.push(new Caracu(3))
		one.handCards.push(new Caracu(3))
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new GainExchangeTokenOption(), new HelpFarmerOptions(3)])
	})
})
