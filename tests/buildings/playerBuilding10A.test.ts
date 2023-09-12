// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { PlayerBuilding10A } from "../../src/buildings/playerBuilding10A.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Player Building 10A", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding10A())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]

	it("should not list options on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
	})

	it("should be allowed to get all actions if player is owner", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new GainCoinOption(5), new GainCoinOption(5), new MoveTrainOptions(3)])
	})
})
