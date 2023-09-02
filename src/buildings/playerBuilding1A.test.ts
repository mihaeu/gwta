import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import GameBoard from "../gameBoard.js"
import RandomPlayer from "../randomplayer.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { PlayerBuilding1A } from "./playerBuilding1A.js"
import { PlayerBuildingNode } from "../nodes.js"
import { GainGrainAction } from "../actions/gainGrainAction.js"

describe("Player Building 1A", () => {
	it("should only allow all gain grain action if player is owner otherwise only auxiliary", () => {
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

		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, two), [new AuxiliaryAction()])
		deepEqual(playerBuilding1AOfPlayerTwo.actions(gameBoard, one), [new AuxiliaryAction()])
		deepEqual(playerBuilding1AOfPlayerOne.actions(gameBoard, one), [new AuxiliaryAction(), new GainGrainAction(1)])
		deepEqual(playerBuilding1AOfPlayerTwo.actions(gameBoard, two), [new AuxiliaryAction(), new GainGrainAction(1)])
	})
})
