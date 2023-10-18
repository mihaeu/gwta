import { beforeEach, describe, expect, it } from "bun:test"
import Engine from "../src/engine.js"
import { JobMarketToken, TakenJobMarketSlot } from "../src/tiles.js"
import { gameBoardWithFourPlayers, gameBoardWithThreePlayers, gameBoardWithTwoPlayers, removeFarmersFromBoard } from "./testUtils.js"
import GameBoard from "../src/gameBoard.js"
import { TestPlayer } from "./testPlayer.js"
import { MoveOption } from "../src/options/moveOption.js"
import { PlayObjectiveCardOption } from "../src/options/playObjectiveCardOption.js"
import { Caracu, Fronterizo, Objective } from "../src/cards.js"
import { GainCoinOption } from "../src/options/gainCoinOption.js"

describe("Engine", () => {
	let gameBoard: GameBoard
	let one: TestPlayer
	let two: TestPlayer
	let engine: Engine

	beforeEach(() => {
		one = new TestPlayer("One")
		one.exchangeTokens = 0
		two = new TestPlayer("Two")
		gameBoard = new GameBoard([one, two])
		one.location = gameBoard.startLocation
		two.location = gameBoard.startLocation
		engine = new Engine(gameBoard)
	})

	describe("phase A", async () => {
		beforeEach(() => {
			removeFarmersFromBoard(gameBoard)
		})

		it("should present player with 4 move options at the start of the game when starting from the start location", async () => {
			await engine.phaseA(one)
			expect(one.callCount).toBe(1)
			expect(one.callArgs[1]).toEqual([
				new MoveOption(gameBoard["neutralBuilding1"]),
				new MoveOption(gameBoard["neutralBuilding2"]),
				new MoveOption(gameBoard["neutralBuilding3"]),
			])
		})

		it("should allow playing objective cards before choosing a move", async () => {
			const objective = new Objective(1, new GainCoinOption(1), 5, -2)
			one.handCards.push(objective)
			one.selectOptionMock = (options) => options[options.length - 1]

			await engine.phaseA(one)
			expect(one.callArgs[1][one.callArgs[1].length - 1]).toEqual(new PlayObjectiveCardOption(objective))
			expect(one.callArgs[2]).toHaveLength(3)
		})
	})

	describe("phase B", async () => {
		beforeEach(() => {
			removeFarmersFromBoard(gameBoard)
		})

		it("should allow playing objective cards before and after a location action during phase B", async () => {
			const objective1 = new Objective(1, new GainCoinOption(1), 5, -2)
			const objective2 = new Objective(2, new GainCoinOption(1), 5, -2)
			const objective3 = new Objective(2, new GainCoinOption(1), 5, -2)
			one.discardCards()
			one.handCards.push(objective1, objective2, objective3, new Fronterizo())
			one.location = gameBoard["neutralBuilding5"]
			gameBoard.cowMarket = [new Caracu(4)]

			let numberOfCall = 0
			one.selectOptionMock = (options) => {
				return [2, 4, 6].includes(++numberOfCall) ? options.find((option) => option instanceof PlayObjectiveCardOption)! : options[0]
			}

			await engine.phaseB(one)

			expect(one.callArgs[1].join(", ")).toBe("LocationOptions(NeutralBuilding5(NeutralBuildingE)), AuxiliaryActionOptions")
			expect(one.callArgs[2].join(", ")).toBe(
				"CompoundOption(GainCoinOption(2),DiscardCardOption(Fronterizo)), BuyCowOption(Caracu,4), PlayObjectiveCardOption(Objective(GainCoinOption(1),5,-2)), PlayObjectiveCardOption(Objective(GainCoinOption(1),5,-2)), PlayObjectiveCardOption(Objective(GainCoinOption(1),5,-2))",
			)
			expect(one.callArgs[3].join(", ")).toBe(
				"CompoundOption(GainCoinOption(2),DiscardCardOption(Fronterizo)), BuyCowOption(Caracu,4), PlayObjectiveCardOption(Objective(GainCoinOption(1),5,-2)), PlayObjectiveCardOption(Objective(GainCoinOption(1),5,-2)), PassOption",
			)
			expect(one.callArgs[4].join(", ")).toBe(
				"BuyCowOption(Caracu,4), PlayObjectiveCardOption(Objective(GainCoinOption(1),5,-2)), PlayObjectiveCardOption(Objective(GainCoinOption(1),5,-2)), PassOption",
			)
			expect(one.callArgs[5].join(", ")).toBe(
				"BuyCowOption(Caracu,4), PlayObjectiveCardOption(Objective(GainCoinOption(1),5,-2)), PassOption",
			)
			expect(one.callArgs[6].join(", ")).toBe("PlayObjectiveCardOption(Objective(GainCoinOption(1),5,-2)), PassOption")
		})
	})

	describe("game end", () => {
		it("should occur when 22 workers were placed for two players and all had same number of turns", () => {
			const { gameBoard, one, two } = gameBoardWithTwoPlayers()
			const engine = new Engine(gameBoard)
			gameBoard.jobMarket = new Array(22).fill(new TakenJobMarketSlot())
			expect(engine.isGameOver()).toBeFalse()

			gameBoard.jobMarket = gameBoard.jobMarket.concat([new JobMarketToken()])
			one.nextTurn()
			expect(engine.isGameOver()).toBeFalse()
			two.nextTurn()
			expect(engine.isGameOver()).toBeTrue()
		})

		it("should occur when 33 workers were placed for three players", () => {
			const { gameBoard } = gameBoardWithThreePlayers()
			const engine = new Engine(gameBoard)
			gameBoard.jobMarket = new Array(33).fill(new TakenJobMarketSlot())
			expect(engine.isGameOver()).toBeFalse()

			gameBoard.jobMarket = gameBoard.jobMarket.concat([new JobMarketToken()])
			expect(engine.isGameOver()).toBeTrue()
		})

		it("should occur when 44 workers were placed for four players", () => {
			const { gameBoard } = gameBoardWithFourPlayers()
			const engine = new Engine(gameBoard)
			gameBoard.jobMarket = new Array(44).fill(new TakenJobMarketSlot())
			expect(engine.isGameOver()).toBeFalse()

			gameBoard.jobMarket = gameBoard.jobMarket.concat([new JobMarketToken()])
			expect(engine.isGameOver()).toBeTrue()
		})
	})
})
