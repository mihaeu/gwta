import GameBoard from "../src/gameBoard.js"
import RandomPlayer from "../src/randomplayer.js"
import { PlayerBuildingNode } from "../src/nodes.js"
import { PlayerBuilding } from "../src/buildings/buildings.js"

export const gameBoardWithTwoPlayers = () => {
	const gameBoard = new GameBoard()
	const one = new RandomPlayer("One", gameBoard.start, [], [])
	const two = new RandomPlayer("Two", gameBoard.start, [], [])

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
