import GameBoard from "../src/gameBoard.js"
import { describe, expect, it } from "bun:test"
import { Carpenter, JobMarketToken, TakenJobMarketSlot } from "../src/tiles.js"
import RandomPlayer from "../src/randomPlayer.js"
import { gameBoardWithFourPlayers, gameBoardWithThreePlayers, gameBoardWithTwoPlayers } from "./testUtils.js"
import { AberdeenAngus, BlancoOrejinegro, Caracu, Chaquenyo, ExhaustionCard, Franqueiro, Serrano } from "../src/cards.js"
import { BlueFarmer, GreenFarmer, HandColor, OrangeFarmer, YellowFarmer } from "../src/farmer.js"

describe("Game Board", () => {
	describe("buildings", () => {
		it("should detect all 22 empty building locations at the start of the game", () => {
			const gameBoard = new GameBoard([new RandomPlayer("Test")])
			expect(gameBoard.emptyBuildingLocations()).toHaveLength(22)
		})
	})

	describe("workers", () => {
		it("should detect the cheapest available worker if available", () => {
			const gameBoard = new GameBoard([new RandomPlayer("Test")])
			gameBoard.jobMarket = [new Carpenter(), new Carpenter(), new JobMarketToken()]
			expect(gameBoard.cheapestAvailableWorker()).toBe(6)
		})

		it("should detect if there all workers are taken", () => {
			const gameBoard = new GameBoard([new RandomPlayer("Test")])
			gameBoard.jobMarket = [
				new TakenJobMarketSlot(),
				new TakenJobMarketSlot(),
				new TakenJobMarketSlot(),
				new TakenJobMarketSlot(),
				new JobMarketToken(),
			]
			expect(gameBoard.cheapestAvailableWorker()).toBe(0)
		})

		it("should seed workers correctly for 2 players", () => {
			const { gameBoard } = gameBoardWithTwoPlayers()
			expect(gameBoard.jobMarket).toHaveLength(6)
			expect(gameBoard.jobMarket[5]).toBeInstanceOf(JobMarketToken)
		})

		it("should seed workers correctly for 3 players", () => {
			const { gameBoard } = gameBoardWithThreePlayers()
			expect(gameBoard.jobMarket).toHaveLength(9)
			expect(gameBoard.jobMarket[8]).toBeInstanceOf(JobMarketToken)
		})

		it("should seed workers correctly for 4 players", () => {
			const { gameBoard } = gameBoardWithFourPlayers()
			expect(gameBoard.jobMarket).toHaveLength(12)
			expect(gameBoard.jobMarket[11]).toBeInstanceOf(JobMarketToken)
		})
	})

	it("should determine next player", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		expect(gameBoard.nextPlayer()).toBe(one)

		one.nextTurn()
		expect(gameBoard.nextPlayer()).toBe(two)

		two.nextTurn()
		expect(gameBoard.nextPlayer()).toBe(one)
	})

	describe("ports", () => {
		it("should have every player on the first port of Le Havre at the start of the game", () => {
			const { gameBoard, one, two } = gameBoardWithTwoPlayers()
			expect(gameBoard["leHavre"].portOne).toEqual([one, two])
		})
	})

	describe("scoring", () => {
		it("should add victory points from cow cards and subtract the ones from exhaustion cards", () => {
			const { gameBoard, one } = gameBoardWithTwoPlayers()
			one.handCards.push(new AberdeenAngus(7))
			expect(gameBoard.endgameScoring()[one.name].cowCards).toBe(5)

			one.discardedCards.push(new Franqueiro(5))
			expect(gameBoard.endgameScoring()[one.name].cowCards).toBe(10)

			one.cards.push(new Serrano())
			expect(gameBoard.endgameScoring()[one.name].cowCards).toBe(12)

			one.handCards.push(new ExhaustionCard())
			expect(gameBoard.endgameScoring()[one.name].cowCards).toBe(10)
		})

		it("should score 2 VP for each helped farmer", () => {
			const { gameBoard, one } = gameBoardWithTwoPlayers()

			expect(gameBoard.endgameScoring()[one.name].helpedFarmers).toBe(0)
			one.helpedFarmers.push(new BlueFarmer(HandColor.BLACK, 3))
			one.helpedFarmers.push(new BlueFarmer(HandColor.BLACK, 3))
			one.helpedFarmers.push(new BlueFarmer(HandColor.BLACK, 3))
			one.helpedFarmers.push(new BlueFarmer(HandColor.BLACK, 3))
			expect(gameBoard.endgameScoring()[one.name].helpedFarmers).toBe(8)
		})

		it("should score all victory points on ships of player", () => {
			const { gameBoard, one, two } = gameBoardWithTwoPlayers()

			gameBoard.availableShips[0].players.push(one)
			gameBoard.availableShips[0].players.push(two)
			gameBoard.availableShips[gameBoard.availableShips.length - 1].players.push(one)

			expect(gameBoard.endgameScoring()[one.name].ships).toBe(10)
			expect(gameBoard.endgameScoring()[two.name].ships).toBe(-2)
		})
	})

	describe("cow market", () => {
		it("should not add anything to full cow market", () => {
			const { gameBoard } = gameBoardWithTwoPlayers()
			expect(gameBoard.cowMarket).toHaveLength(9)

			gameBoard.refillCowMarket()
			expect(gameBoard.cowMarket).toHaveLength(9)
		})
		it("should refill cow market to maximum for player size", () => {
			const { gameBoard } = gameBoardWithThreePlayers()
			gameBoard.cowMarket = new Array(3).fill(new AberdeenAngus(6))

			expect(gameBoard.cowMarket).toHaveLength(3)
			gameBoard.refillCowMarket()
			expect(gameBoard.cowMarket).toHaveLength(12)
		})
	})

	describe("ships", () => {
		it("should refill 3 ships", () => {
			const { gameBoard } = gameBoardWithTwoPlayers()

			expect(gameBoard.availableShips).toHaveLength(11)
			gameBoard.refillShips()
			expect(gameBoard.availableShips).toHaveLength(14)
		})
	})

	describe("objectives", () => {
		it("should count all objectives per player", () => {
			const { gameBoard, one } = gameBoardWithTwoPlayers()
			expect(gameBoard.collectObjectives()).toEqual({
				One: {
					aberdeenAngus: 0,
					blueFarmer: 0,
					building: 0,
					caracu: 0,
					eastPort: 0,
					franqueiro: 0,
					greenFarmer: 0,
					northPort: 0,
					orangeFarmer: 0,
					southPort: 0,
					trainStation: 0,
					value18Ship: 0,
					value3Cow: 0,
					westPort: 0,
					yellowFarmer: 0,
				},
				Two: {
					aberdeenAngus: 0,
					blueFarmer: 0,
					building: 0,
					caracu: 0,
					eastPort: 0,
					franqueiro: 0,
					greenFarmer: 0,
					northPort: 0,
					orangeFarmer: 0,
					southPort: 0,
					trainStation: 0,
					value18Ship: 0,
					value3Cow: 0,
					westPort: 0,
					yellowFarmer: 0,
				},
			})
		})

		it("should count all cows", () => {
			const { gameBoard, one } = gameBoardWithTwoPlayers()
			one.handCards.push(new Franqueiro(4), new Caracu(1))
			one.discardedCards.push(new Serrano(), new BlancoOrejinegro(), new Chaquenyo())
			one.cards.push(new AberdeenAngus(7))
			const objectives = gameBoard.collectObjectives()
			expect(objectives[one.name].caracu).toEqual(1)
			expect(objectives[one.name].value3Cow).toEqual(3)
			expect(objectives[one.name].franqueiro).toEqual(1)
			expect(objectives[one.name].aberdeenAngus).toEqual(1)
		})

		it("should check all token on value 18 ship", () => {
			const { gameBoard, one, two } = gameBoardWithTwoPlayers()
			gameBoard.availableShips[gameBoard.availableShips.length - 1].players.push(one, one, two)
			const objectives = gameBoard.collectObjectives()
			expect(objectives[one.name].value18Ship).toEqual(2)
			expect(objectives[two.name].value18Ship).toEqual(1)
		})

		it("should count all buildings", () => {
			const { gameBoard, one } = gameBoardWithTwoPlayers()
			gameBoard["grainBuilding1"].buildOrUpgradeBuilding(one.availableBuildings[0])
			gameBoard["specialBuilding1"].buildOrUpgradeBuilding(one.availableBuildings[0])
			gameBoard["basicBuilding1"].buildOrUpgradeBuilding(one.availableBuildings[0])
			const objectives = gameBoard.collectObjectives()
			expect(objectives[one.name].building).toEqual(3)
		})

		it("should count all helped farmers", () => {
			const { gameBoard, one } = gameBoardWithTwoPlayers()
			one.helpedFarmers.push(
				new BlueFarmer(HandColor.BLACK, 4),
				new OrangeFarmer(HandColor.BLACK, 4),
				new OrangeFarmer(HandColor.BLACK, 4),
				new YellowFarmer(HandColor.BLACK, 4),
				new YellowFarmer(HandColor.BLACK, 4),
				new YellowFarmer(HandColor.BLACK, 4),
				new GreenFarmer(HandColor.BLACK, 4),
				new GreenFarmer(HandColor.BLACK, 4),
				new GreenFarmer(HandColor.BLACK, 4),
				new GreenFarmer(HandColor.BLACK, 4),
			)
			const objectives = gameBoard.collectObjectives()
			expect(objectives[one.name].blueFarmer).toEqual(1)
			expect(objectives[one.name].orangeFarmer).toEqual(2)
			expect(objectives[one.name].yellowFarmer).toEqual(3)
			expect(objectives[one.name].greenFarmer).toEqual(4)
		})

		it("should count all tokens on ports", () => {
			const { gameBoard, one } = gameBoardWithTwoPlayers()
			gameBoard.leHavre.north.spaces[0].player = one
			gameBoard.leHavre.east.spaces[0].player = one
			gameBoard.leHavre.south.spaces[0].player = one
			gameBoard.leHavre.west.spaces[0].player = one
			gameBoard.rotterdam.east.spaces[0].player = one
			gameBoard.rotterdam.south.spaces[0].player = one
			gameBoard.rotterdam.west.spaces[0].player = one
			gameBoard.liverpool.south.spaces[0].player = one
			gameBoard.liverpool.west.spaces[0].player = one
			gameBoard.liverpool.west.spaces[1].player = one
			const objectives = gameBoard.collectObjectives()
			expect(objectives[one.name].northPort).toEqual(1)
			expect(objectives[one.name].eastPort).toEqual(2)
			expect(objectives[one.name].southPort).toEqual(3)
			expect(objectives[one.name].westPort).toEqual(4)
		})

		it.skip("should count all train stations", () => {})
	})
})
