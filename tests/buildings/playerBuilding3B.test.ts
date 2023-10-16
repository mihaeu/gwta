import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers, gameBoardWithTwoPlayersAndBuildings, setUpThreeFarmersWithTotalStrengthOf9 } from "../testUtils.js"
import { Objective } from "../../src/cards.js"
import { PlayerBuilding3B } from "../../src/buildings/playerBuilding3B.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { DiscardCardOption } from "../../src/options/discardCardOption.js"
import { CompoundOption } from "../../src/options/compoundOption.js"

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
		one.handCards.push(new Objective())
		one.handCards.push(new Objective())
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([
			new CertificateOption(2),
			new CompoundOption(new DiscardCardOption(new Objective()), new CertificateOption(3)),
			new CompoundOption(new DiscardCardOption(new Objective()), new CertificateOption(3)),
		])
	})
})
