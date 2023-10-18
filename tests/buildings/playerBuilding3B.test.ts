import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers, gameBoardWithTwoPlayersAndBuildings, setUpThreeFarmersWithTotalStrengthOf9 } from "../testUtils.js"
import { Objective } from "../../src/cards.js"
import { PlayerBuilding3B } from "../../src/buildings/playerBuilding3B.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { DiscardCardOption } from "../../src/options/discardCardOption.js"
import { CompoundOption } from "../../src/options/compoundOption.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Player Building 3B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding3B())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should not have options on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
		expect(playerBuildingOfPlayerTwo.options(gameBoard, one)).toHaveLength(0)
	})

	it("should be be able to get +2 certificate option", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new CertificateOption(2)])
	})

	it("should be be able to get +3 certificate options if objective cards are on player's hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		setUpThreeFarmersWithTotalStrengthOf9(gameBoard)
		const objective1 = new Objective(1, new GainCoinOption(1), 5, -2)
		const objective2 = new Objective(2, new GainCoinOption(1), 4, -2)
		one.handCards.push(objective1, objective2)
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([
			new CertificateOption(2),
			new CompoundOption(new DiscardCardOption(objective1), new CertificateOption(3)),
			new CompoundOption(new DiscardCardOption(objective2), new CertificateOption(3)),
		])
	})
})
