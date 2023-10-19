import { beforeEach, describe, expect, it } from "bun:test"
import Engine from "../src/engine.js"
import { JobMarketToken, TakenJobMarketSlot } from "../src/tiles.js"
import { gameBoardWithFourPlayers, gameBoardWithThreePlayers, gameBoardWithTwoPlayers, removeFarmersFromBoard } from "./testUtils.js"
import GameBoard from "../src/gameBoard.js"
import { TestPlayer } from "./testPlayer.js"
import { MoveOption } from "../src/options/moveOption.js"
import { PlayObjectiveCardOption } from "../src/options/playObjectiveCardOption.js"
import { Caracu, Fronterizo } from "../src/cards.js"
import { GainCoinOption } from "../src/options/gainCoinOption.js"
import { LocationOptions } from "../src/actions/locationOptions.js"
import { CompoundOption } from "../src/options/compoundOption.js"
import { BuyCowOption } from "../src/options/buyCowOption.js"
import { AuxiliaryActionOptions } from "../src/actions/auxiliaryActionOptions.js"
import { Objectives } from "../src/objectives.js"
import { ObjectiveCard } from "../src/objectiveCard.js"

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
			const objective = new ObjectiveCard(1, new GainCoinOption(1), 5, -2, new Objectives())
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
			const objective1 = new ObjectiveCard(1, new GainCoinOption(1), 5, -2, new Objectives())
			const objective2 = new ObjectiveCard(2, new GainCoinOption(1), 5, -2, new Objectives())
			const objective3 = new ObjectiveCard(2, new GainCoinOption(1), 5, -2, new Objectives())
			one.discardCards()
			one.handCards.push(objective1, objective2, objective3, new Fronterizo())
			one.location = gameBoard["neutralBuilding5"]
			gameBoard.cowMarket = [new Caracu(4)]

			let numberOfCall = 0
			one.selectOptionMock = (options) => {
				switch (++numberOfCall) {
					case 1:
						return options.find((option) => option instanceof LocationOptions)!
					case 2:
						return options.find((option) => option instanceof PlayObjectiveCardOption)!
					case 3:
						return options.find((option) => option instanceof CompoundOption)!
					case 4:
						return options.find((option) => option instanceof PlayObjectiveCardOption)!
					case 5:
						return options.find((option) => option instanceof BuyCowOption)!
					case 6:
						return options.find((option) => option instanceof PlayObjectiveCardOption)!
					default:
						return options.find((option) => option instanceof PlayObjectiveCardOption)!
				}
			}

			await engine.phaseB(one)

			expect(one.callArgs[1].join(", ")).toBe("LocationOptions(NeutralBuilding5(NeutralBuildingE)), AuxiliaryActionOptions")
			expect(one.callArgs[2].join(", ")).toBe(
				"CompoundOption(GainCoinOption(2),DiscardCardOption(Fronterizo)), BuyCowOption(Caracu,4), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2)), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2)), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2))",
			)
			expect(one.callArgs[3].join(", ")).toBe(
				"CompoundOption(GainCoinOption(2),DiscardCardOption(Fronterizo)), BuyCowOption(Caracu,4), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2)), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2)), PassOption",
			)
			expect(one.callArgs[4].join(", ")).toBe(
				"BuyCowOption(Caracu,4), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2)), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2)), PassOption",
			)
			expect(one.callArgs[5].join(", ")).toBe(
				"BuyCowOption(Caracu,4), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2)), PassOption",
			)
			expect(one.callArgs[6].join(", ")).toBe("PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2)), PassOption")
		})

		it("should allow playing objective cards before and after auxiliary actions", async () => {
			const objective1 = new ObjectiveCard(1, new GainCoinOption(1), 5, -2, new Objectives())
			const objective2 = new ObjectiveCard(2, new GainCoinOption(1), 5, -2, new Objectives())
			one.discardCards()
			one.handCards.push(objective1, objective2)
			one.location = gameBoard["neutralBuilding5"]

			let numberOfCall = 0
			one.selectOptionMock = (options) => {
				switch (++numberOfCall) {
					case 1:
						return options.find((option) => option instanceof AuxiliaryActionOptions)!
					case 2:
						return options.find((option) => option instanceof PlayObjectiveCardOption)!
					case 3:
						return options.find((option) => option instanceof GainCoinOption)!
					case 4:
						return options.find((option) => option instanceof PlayObjectiveCardOption)!
					default:
						return options.find((option) => option instanceof PlayObjectiveCardOption)!
				}
			}

			await engine.phaseB(one)

			expect(one.callArgs[1].join(", ")).toBe("LocationOptions(NeutralBuilding5(NeutralBuildingE)), AuxiliaryActionOptions")
			expect(one.callArgs[2].join(", ")).toBe(
				"GainCoinOption(1), FirstThanSecondsOption(DrawCardOption,DiscardCardOptions), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2)), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2))",
			)
			expect(one.callArgs[3].join(", ")).toBe(
				"GainCoinOption(1), FirstThanSecondsOption(DrawCardOption,DiscardCardOptions), PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2))",
			)
			expect(one.callArgs[4].join(", ")).toBe("PlayObjectiveCardOption(ObjectiveCard(GainCoinOption(1),5,-2)), PassOption")
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
