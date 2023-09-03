import GameBoard from "../src/gameBoard.js"
import RandomPlayer from "../src/randomPlayer.js"
import { PlayerBuildingNode } from "../src/nodes.js"

import { PlayerBuilding } from "../src/buildings/playerBuilding.js"
import { PlayerBuilding1A } from "../src/buildings/playerBuilding1A.js"
import { PlayerBuilding2A } from "../src/buildings/playerBuilding2A.js"
import { PlayerBuilding3A } from "../src/buildings/playerBuilding3A.js"
import { PlayerBuilding4A } from "../src/buildings/playerBuilding4A.js"
import { PlayerBuilding5A } from "../src/buildings/playerBuilding5A.js"
import { PlayerBuilding6A } from "../src/buildings/playerBuilding6A.js"
import { PlayerBuilding7A } from "../src/buildings/playerBuilding7A.js"
import { PlayerBuilding8A } from "../src/buildings/playerBuilding8A.js"
import { PlayerBuilding9A } from "../src/buildings/playerBuilding9A.js"
import { PlayerBuilding10A } from "../src/buildings/playerBuilding10A.js"

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

export const gameBoardWithTwoPlayers = () => {
	const gameBoard = new GameBoard()
	const one = new RandomPlayer("One")
	const two = new RandomPlayer("Two")
	one.setStartBuildings(playerBuildings)
	two.setStartBuildings(playerBuildings)

	return { gameBoard, one, two }
}

export const gameBoardWithTwoPlayersAndBuildings = (playerBuilding: PlayerBuilding) => {
	const { gameBoard, one, two } = gameBoardWithTwoPlayers()

	const playerBuildingOfPlayerOne = Object.create(playerBuilding)
	const playerBuildingOfPlayerTwo = Object.create(playerBuilding)
	playerBuildingOfPlayerOne.player = one
	playerBuildingOfPlayerTwo.player = two

	const grainLocations: PlayerBuildingNode[] = gameBoard
		.emptyBuildingLocations()
		.filter((playerBuildingLocation) => playerBuildingLocation.hasGrain)

	grainLocations[0].buildOrUpgradeBuilding(playerBuildingOfPlayerOne)
	grainLocations[1].buildOrUpgradeBuilding(playerBuildingOfPlayerTwo)
	return { gameBoard, one, two }
}
