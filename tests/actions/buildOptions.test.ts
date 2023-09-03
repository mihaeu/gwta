import { describe, it } from "node:test"
import { BuildOptions } from "../../src/actions/buildOptions.js"
import GameBoard from "../../src/gameBoard.js"
import RandomPlayer from "../../src/randomPlayer.js"
import { Carpenter } from "../../src/tiles.js"
import { equal } from "node:assert/strict"
import { UpgradeBuildingOption } from "../../src/options/upgradeBuildingOption.js"
import { deepEqual } from "node:assert"
import { PlayerBuilding1A } from "../../src/buildings/playerBuilding1A.js"
import { PlayerBuilding2A } from "../../src/buildings/playerBuilding2A.js"
import { PlayerBuilding3A } from "../../src/buildings/playerBuilding3A.js"
import { PlayerBuilding4A } from "../../src/buildings/playerBuilding4A.js"
import { PlayerBuilding5A } from "../../src/buildings/playerBuilding5A.js"
import { PlayerBuilding6A } from "../../src/buildings/playerBuilding6A.js"
import { PlayerBuilding7A } from "../../src/buildings/playerBuilding7A.js"
import { PlayerBuilding8A } from "../../src/buildings/playerBuilding8A.js"
import { PlayerBuilding9A } from "../../src/buildings/playerBuilding9A.js"
import { PlayerBuilding10A } from "../../src/buildings/playerBuilding10A.js"
import { gameBoardWithTwoPlayers } from "../testUtils.js"

const playerBuildings = [
	new PlayerBuilding1A(),
	new PlayerBuilding2A(),
	new PlayerBuilding3A(),
	new PlayerBuilding4A(),
	new PlayerBuilding5A(),
	new PlayerBuilding6A(),
	new PlayerBuilding7A(),
	new PlayerBuilding8A(),
	new PlayerBuilding9A(),
	new PlayerBuilding10A(),
]
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
		one.setStartBuildings([new PlayerBuilding10A(one)])
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.gainCoins(8)

		equal(gameBoard.playerBuildings(one).length, 0)
		const existingBuilding = new PlayerBuilding8A(one)
		const availableBuildingLocation = gameBoard.emptyBuildingLocations()[0]
		availableBuildingLocation.buildOrUpgradeBuilding(existingBuilding)
		equal(gameBoard.playerBuildings(one).length, 1)

		deepEqual(buildOptions.resolve(gameBoard, one), [new UpgradeBuildingOption(new PlayerBuilding10A(one), availableBuildingLocation)])
	})
})
