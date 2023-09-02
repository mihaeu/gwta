import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import GameBoard from "../gameBoard.js"
import RandomPlayer from "../randomplayer.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { PlayerBuildingNode } from "../nodes.js"
import { GainCoinAction } from "../actions/gainCoinAction.js"
import { PlayerBuilding1B } from "./playerBuilding1B.js"

describe("Player Building 1B", () => {
	const gameBoard = new GameBoard()
	const one = new RandomPlayer("One", gameBoard.start, [], [])
	const two = new RandomPlayer("Two", gameBoard.start, [], [])

	const grainLocations: PlayerBuildingNode[] = gameBoard
		.emptyBuildingLocations()
		.filter((playerBuildingLocation) => playerBuildingLocation.hasGrain)
	const playerBuilding1AOfPlayerOne = new PlayerBuilding1B(one)
	const playerBuilding1AOfPlayerTwo = new PlayerBuilding1B(two)
	grainLocations[0].buildOrUpgradeBuilding(playerBuilding1AOfPlayerOne)
	grainLocations[1].buildOrUpgradeBuilding(playerBuilding1AOfPlayerTwo)

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, two), [new AuxiliaryAction()])
		deepEqual(playerBuilding1AOfPlayerTwo.actions(gameBoard, one), [new AuxiliaryAction()])
	})

	it("should be allowed to to a get coin action on their building", () => {
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, one), [new AuxiliaryAction(), new GainCoinAction(2)])
		deepEqual(playerBuilding1AOfPlayerTwo.actions(gameBoard, two), [new AuxiliaryAction(), new GainCoinAction(2)])
	})
})
