import { describe, expect, it } from "bun:test"
import { BuildOptions } from "../../src/actions/buildOptions.js"
import GameBoard from "../../src/gameBoard.js"
import RandomPlayer from "../../src/randomPlayer.js"
import { Carpenter } from "../../src/tiles.js"
import { UpgradeBuildingOption } from "../../src/options/upgradeBuildingOption.js"
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
		expect(buildAction.resolve(gameBoard, one)).toHaveLength(176)
	})

	it("should allow upgrading from a building that requires 5 carpenters to one with 9 if the player has 4 carpenters and enough coin", () => {
		const buildOptions = new BuildOptions()
		const one = new RandomPlayer("One")
		const gameBoard = new GameBoard([one])
		const building10a = new PlayerBuilding10A(one)
		one["availableBuildings"] = [building10a]
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.hireWorker(new Carpenter())
		one.gainCoins(8)

		expect(gameBoard.playerBuildings(one)).toHaveLength(0)
		const existingBuilding = new PlayerBuilding8A(one)
		const availableBuildingLocation = gameBoard.emptyBuildingLocations()[0]
		availableBuildingLocation.buildOrUpgradeBuilding(existingBuilding)
		expect(gameBoard.playerBuildings(one)).toHaveLength(1)

		expect(buildOptions.resolve(gameBoard, one)).toEqual([new UpgradeBuildingOption(building10a, availableBuildingLocation)])
	})
})
