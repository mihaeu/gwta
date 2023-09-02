import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import GameBoard from "../../src/gameBoard.js"
import RandomPlayer from "../../src/randomplayer.js"
import { AuxiliaryAction } from "../../src/actions/auxiliaryAction.js"
import { PlayerBuilding1A } from "../../src/buildings/playerBuilding1A.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { GainGrainAction } from "../../src/actions/gainGrainAction.js"

describe("Player Building 1A", () => {
	const gameBoard = new GameBoard()
	const one = new RandomPlayer("One", gameBoard.start, [], [])
	const two = new RandomPlayer("Two", gameBoard.start, [], [])

	const grainLocations: PlayerBuildingNode[] = gameBoard
		.emptyBuildingLocations()
		.filter((playerBuildingLocation) => playerBuildingLocation.hasGrain)
	const playerBuilding1AOfPlayerOne = new PlayerBuilding1A(one)
	const playerBuilding1AOfPlayerTwo = new PlayerBuilding1A(two)
	grainLocations[0].buildOrUpgradeBuilding(playerBuilding1AOfPlayerOne)
	grainLocations[1].buildOrUpgradeBuilding(playerBuilding1AOfPlayerTwo)

	it("should only be allowed to do auxiliary actions on buildings of other players", () => {
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, two), [new AuxiliaryAction()])
		deepEqual(playerBuilding1AOfPlayerTwo.actions(gameBoard, one), [new AuxiliaryAction()])
	})

	it("should be allowed to to a get grain action on their building", () => {
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, one), [new AuxiliaryAction(), new GainGrainAction(1)])
		deepEqual(playerBuilding1AOfPlayerTwo.actions(gameBoard, two), [new AuxiliaryAction(), new GainGrainAction(1)])
	})
})
