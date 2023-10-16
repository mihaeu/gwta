import { beforeEach, describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "./testUtils.js"
import GameBoard from "../src/gameBoard.js"
import Player from "../src/player.js"
import {
	SpecialBuilding1,
	SpecialBuilding2,
	SpecialBuilding3,
	SpecialBuilding4,
	SpecialGrainBuilding1,
	SpecialGrainBuilding2,
	SpecialGrainBuilding3,
} from "../src/nodes.js"
import { AnyCowCard } from "../src/cards.js"
import { DiscardCardOptions } from "../src/actions/discardCardOptions.js"
import { PlayerBuilding1B } from "../src/buildings/playerBuilding1B.js"
import { FirstThanSecondsOption } from "../src/options/firstThanSecondOption.js"
import { CertificateOption } from "../src/options/certificateOption.js"
import { GainCoinOption } from "../src/options/gainCoinOption.js"
import { GainGrainOption } from "../src/options/gainGrainOption.js"

describe("Nodes", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player

	beforeEach(() => {
		const setup = gameBoardWithTwoPlayers()
		gameBoard = setup.gameBoard
		one = setup.one
		two = setup.two
	})

	describe("SpecialBuilding1", () => {
		it("should show 1 certificate for discard option only if cow cards are available", () => {
			const node = new SpecialBuilding1()
			node.buildOrUpgradeBuilding(new PlayerBuilding1B(one))
			expect(node.options(gameBoard, one)).toEqual([
				new FirstThanSecondsOption(new CertificateOption(1), new DiscardCardOptions(new AnyCowCard())),
			])
			expect(node.options(gameBoard, two)).toBeEmpty()

			one.discardCards()
			expect(node.options(gameBoard, one)).toBeEmpty()
		})
	})

	describe("SpecialBuilding2", () => {
		it("should show 1 coin for discard option only if cow cards are available", () => {
			const node = new SpecialBuilding2()
			node.buildOrUpgradeBuilding(new PlayerBuilding1B(one))
			expect(node.options(gameBoard, one)).toEqual([
				new FirstThanSecondsOption(new GainCoinOption(1), new DiscardCardOptions(new AnyCowCard())),
			])
			expect(node.options(gameBoard, two)).toBeEmpty()

			one.discardCards()
			expect(node.options(gameBoard, one)).toBeEmpty()
		})
	})

	describe("SpecialBuilding3", () => {
		it("should show 1 grain for discard option only if cow cards are available", () => {
			const node = new SpecialBuilding3()
			node.buildOrUpgradeBuilding(new PlayerBuilding1B(one))
			expect(node.options(gameBoard, one)).toEqual([
				new FirstThanSecondsOption(new GainGrainOption(1), new DiscardCardOptions(new AnyCowCard())),
			])
			expect(node.options(gameBoard, two)).toBeEmpty()

			one.discardCards()
			expect(node.options(gameBoard, one)).toBeEmpty()
		})
	})

	describe("SpecialBuilding4", () => {
		it("should show 1 grain for discard option only if cow cards are available", () => {
			const node = new SpecialBuilding4()
			node.buildOrUpgradeBuilding(new PlayerBuilding1B(one))
			expect(node.options(gameBoard, one)).toEqual([
				new FirstThanSecondsOption(new GainGrainOption(1), new DiscardCardOptions(new AnyCowCard())),
			])
			expect(node.options(gameBoard, two)).toBeEmpty()

			one.discardCards()
			expect(node.options(gameBoard, one)).toBeEmpty()
		})
	})

	describe("SpecialGrainBuilding1", () => {
		it("should show 2 coin for discard option only if cow cards are available", () => {
			const node = new SpecialGrainBuilding1()
			node.buildOrUpgradeBuilding(new PlayerBuilding1B(one))
			expect(node.options(gameBoard, one)).toEqual([
				new FirstThanSecondsOption(new GainCoinOption(2), new DiscardCardOptions(new AnyCowCard())),
			])
			expect(node.options(gameBoard, two)).toBeEmpty()

			one.discardCards()
			expect(node.options(gameBoard, one)).toBeEmpty()
		})
	})

	describe("SpecialGrainBuilding2", () => {
		it("should show 1 certificate for discard option only if cow cards are available", () => {
			const node = new SpecialGrainBuilding2()
			node.buildOrUpgradeBuilding(new PlayerBuilding1B(one))
			expect(node.options(gameBoard, one)).toEqual([
				new FirstThanSecondsOption(new CertificateOption(1), new DiscardCardOptions(new AnyCowCard())),
			])
			expect(node.options(gameBoard, two)).toBeEmpty()

			one.discardCards()
			expect(node.options(gameBoard, one)).toBeEmpty()
		})
	})

	describe("SpecialGrainBuilding3", () => {
		it("should show 1 certificate for discard option only if cow cards are available", () => {
			const node = new SpecialGrainBuilding3()
			node.buildOrUpgradeBuilding(new PlayerBuilding1B(one))
			expect(node.options(gameBoard, one)).toEqual([
				new FirstThanSecondsOption(new GainGrainOption(1), new DiscardCardOptions(new AnyCowCard())),
			])
			expect(node.options(gameBoard, two)).toBeEmpty()

			one.discardCards()
			expect(node.options(gameBoard, one)).toBeEmpty()
		})
	})
})
