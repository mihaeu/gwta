import { describe, it } from "node:test"
import { BuildOptions } from "../../src/actions/buildOptions.js"
import GameBoard from "../../src/gameBoard.js"
import RandomPlayer from "../../src/randomPlayer.js"
import { Carpenter } from "../../src/tiles.js"
import { equal } from "node:assert/strict"
import { UpgradeBuildingOption } from "../../src/options/upgradeBuildingOption.js"
import { deepEqual } from "node:assert"
import { PlayerBuilding8A } from "../../src/buildings/playerBuilding8A.js"
import { PlayerBuilding10A } from "../../src/buildings/playerBuilding10A.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"

describe("Build Options", () => {
	it("should list a combination of all 22 free spaces and 8 buildings given 6 carpenters and enough coin", () => {
		const buildAction = new BuildOptions()
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.gainCoins(12)
		equal(buildAction.resolve(gameBoard, one).length, 176)
	})

	it("should allow upgrading from a building that requires 5 carpenters to one with 9 if the player has 4 carpenters and enough coin", () => {
		const buildOptions = new BuildOptions()
		const gameBoard = new GameBoard()
		const one = new RandomPlayer("One")
		const building10a = new PlayerBuilding10A(one)
		one["availableBuildings"] = [building10a]
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.gainCoins(8)

		equal(gameBoard.playerBuildings(one).length, 0)
		const existingBuilding = new PlayerBuilding8A(one)
		const availableBuildingLocation = gameBoard.emptyBuildingLocations()[0]
		availableBuildingLocation.buildOrUpgradeBuilding(existingBuilding)
		equal(gameBoard.playerBuildings(one).length, 1)

		deepEqual(buildOptions.resolve(gameBoard, one), [new UpgradeBuildingOption(building10a, availableBuildingLocation)])
	})
})
