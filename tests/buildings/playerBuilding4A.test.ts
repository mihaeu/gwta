import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { PlayerBuilding4A } from "../../src/buildings/playerBuilding4A.js"
import { FirstThanSecondsOption } from "../../src/options/firstThanSecondOption.js"
import { DrawCardOption } from "../../src/options/drawCardOption.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { Herder } from "../../src/tiles.js"

describe("Player Building 4A", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding4A())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	const playerBuildingOfPlayerTwo = gameBoard.playerBuildings(two)[0]

	it("should not have options on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
		expect(playerBuildingOfPlayerTwo.options(gameBoard, one)).toHaveLength(0)
	})

	it("should be be able to draw and discard cards based on herder count and increase certificates by 2", () => {
		one.hireWorker(new Herder())
		one.hireWorker(new Herder())
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([
			new FirstThanSecondsOption(new DrawCardOption(3), new DiscardCardOptions(3)),
			new CertificateOption(2),
		])
	})
})
