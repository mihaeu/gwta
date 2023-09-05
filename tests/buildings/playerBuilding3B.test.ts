import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers, gameBoardWithTwoPlayersAndBuildings, setUpThreeFarmersWithTotalStrengthOf9 } from "../testUtils.js"
import { Objective } from "../../src/cards.js"
import { PlayerBuilding3B } from "../../src/buildings/playerBuilding3B.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { CostBenefitCombinedOptions } from "../../src/actions/costBenefitCombinedOptions.js"
import { DiscardCardOption } from "../../src/options/discardCardOption.js"

describe("Player Building 3B", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding3B())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should not have options on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [])
		deepEqual(playerBuildingOfPlayerTwo.options(gameBoard, one), [])
	})

	it("should be be able to get +2 certificate option", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [new CertificateOption(2)])
	})

	it("should be be able to get +3 certificate options if objective cards are on player's hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		setUpThreeFarmersWithTotalStrengthOf9(gameBoard)
		one.handCards.push(new Objective())
		one.handCards.push(new Objective())
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [
			new CertificateOption(2),
			new CostBenefitCombinedOptions(new DiscardCardOption(new Objective()), new CertificateOption(3)),
			new CostBenefitCombinedOptions(new DiscardCardOption(new Objective()), new CertificateOption(3)),
		])
	})
})
