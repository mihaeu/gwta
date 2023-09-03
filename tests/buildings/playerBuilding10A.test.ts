import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { AuxiliaryActionOptions } from "../../src/actions/auxiliaryActionOptions.js"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { PlayerBuilding10A } from "../../src/buildings/playerBuilding10A.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Player Building 10A", () => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding10A())
	const playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, two), [new AuxiliaryActionOptions()])
	})

	it("should be allowed to get all actions if player is owner", () => {
		deepEqual(playerBuildingOfPlayerOne.options(gameBoard, one), [
			new AuxiliaryActionOptions(),
			new GainCoinOption(5),
			new GainCoinOption(5),
			new MoveTrainOptions(3),
		])
	})
})
