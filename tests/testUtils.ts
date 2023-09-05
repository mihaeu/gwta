import GameBoard from "../src/gameBoard.js"
import RandomPlayer from "../src/randomPlayer.js"
import { PlayerBuildingNode } from "../src/nodes.js"

import { PlayerBuilding } from "../src/buildings/playerBuilding.js"
import { equal } from "node:assert/strict"
import { BlueFarmer, GreenFarmer, HandColor, OrangeFarmer } from "../src/farmer.js"

const playerBuildings = new Array(10).fill(0)

export const gameBoardWithTwoPlayers = () => {
	const gameBoard = new GameBoard()
	const one = new RandomPlayer("One")
	const two = new RandomPlayer("Two")
	one.setStartBuildings(playerBuildings)
	two.setStartBuildings(playerBuildings)

	return { gameBoard, one, two }
}

export const removeFarmersFromBoard = (gameBoard: GameBoard) => {
	gameBoard.greenFarmers.forEach((farmer) => farmer.helpFarmer())
	gameBoard.orangeFarmers.forEach((farmer) => farmer.helpFarmer())
	gameBoard.blueFarmers.forEach((farmer) => farmer.helpFarmer())
	gameBoard.yellowFarmers.forEach((farmer) => farmer.helpFarmer())
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

export const setUpThreeFarmersWithTotalStrengthOf9 = (gameBoard: GameBoard) => {
	removeFarmersFromBoard(gameBoard)
	const orangeFarmer = new OrangeFarmer(HandColor.BLACK, 3)
	gameBoard.orangeFarmers[0].addFarmer(orangeFarmer)
	equal(gameBoard.orangeFarmers[0].isEmpty(), false)
	const greenFarmer = new GreenFarmer(HandColor.BLACK, 3)
	gameBoard.greenFarmers[0].addFarmer(greenFarmer)
	equal(gameBoard.greenFarmers[0].isEmpty(), false)
	const blueFarmer = new BlueFarmer(HandColor.BLACK, 3)
	gameBoard.blueFarmers[0].addFarmer(blueFarmer)
	equal(gameBoard.blueFarmers[0].isEmpty(), false)
	const farmerLocations = [gameBoard.orangeFarmers[0], gameBoard.greenFarmers[0], gameBoard.blueFarmers[0]]
	return { orangeFarmer, greenFarmer, blueFarmer, farmerLocations }
}
