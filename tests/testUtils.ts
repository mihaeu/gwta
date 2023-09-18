import GameBoard from "../src/gameBoard.js"
import RandomPlayer from "../src/randomPlayer.js"
import { PlayerBuildingNode } from "../src/nodes.js"

import { PlayerBuilding } from "../src/buildings/playerBuilding.js"
import { BlueFarmer, GreenFarmer, HandColor, OrangeFarmer } from "../src/farmer.js"
// @ts-ignore
import { expect } from "bun:test"

export const gameBoardWithTwoPlayers = () => {
	const one = new RandomPlayer("One")
	const two = new RandomPlayer("Two")
	const gameBoard = new GameBoard([one, two])

	return { gameBoard, one, two }
}

export const gameBoardWithThreePlayers = () => {
	const one = new RandomPlayer("One")
	const two = new RandomPlayer("Two")
	const three = new RandomPlayer("Three")
	const gameBoard = new GameBoard([one, two, three])

	return { gameBoard, one, two, three }
}

export const gameBoardWithFourPlayers = () => {
	const one = new RandomPlayer("One")
	const two = new RandomPlayer("Two")
	const three = new RandomPlayer("Three")
	const four = new RandomPlayer("Four")
	const gameBoard = new GameBoard([one, two, three, four])

	return { gameBoard, one, two, three, four }
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
	expect(gameBoard.orangeFarmers[0].isEmpty()).toBeFalse()
	const greenFarmer = new GreenFarmer(HandColor.BLACK, 3)
	gameBoard.greenFarmers[0].addFarmer(greenFarmer)
	expect(gameBoard.greenFarmers[0].isEmpty()).toBeFalse()
	const blueFarmer = new BlueFarmer(HandColor.BLACK, 3)
	gameBoard.blueFarmers[0].addFarmer(blueFarmer)
	expect(gameBoard.blueFarmers[0].isEmpty()).toBeFalse()
	const farmerLocations = [gameBoard.orangeFarmers[0], gameBoard.greenFarmers[0], gameBoard.blueFarmers[0]]
	return { orangeFarmer, greenFarmer, blueFarmer, farmerLocations }
}
