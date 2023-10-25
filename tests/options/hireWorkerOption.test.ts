import { beforeEach, describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { HireWorkerOption } from "../../src/options/hireWorkerOption.js"
import { Carpenter, Herder, Machinist, TakenJobMarketSlot, Worker } from "../../src/tiles.js"
import { OrOption } from "../../src/options/orOption.js"
import { ForfeitOption } from "../../src/options/forfeitOption.js"
import { GainExchangeTokenOption } from "../../src/options/gainExchangeTokenOption.js"
import GameBoard from "../../src/gameBoard.js"
import Player, { UpgradeType } from "../../src/player.js"
import { OneByOneOption } from "../../src/options/oneByOneOption.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"
import { RemoveCardOptions } from "../../src/actions/removeCardOptions.js"
import { AnyCard, AnyCowCard } from "../../src/cards.js"
import { BuyCowOptions } from "../../src/actions/buyCowOptions.js"
import { BuildOptions } from "../../src/actions/buildOptions.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { DiscardCardOptions } from "../../src/actions/discardCardOptions.js"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { Farmer, HiredFarmer } from "../../src/farmer.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"
import { TokenToPortOptions } from "../../src/actions/tokenToPortOptions.js"

const CARPENTER_INDEX = 0
const HERDER_INDEX = 1
const MACHINIST_INDEX = 2
describe("Hire Worker Option", () => {
	let gameBoard: GameBoard
	let one: Player
	let carpenterArgs: [Worker, number, number]
	let herderArgs: [Worker, number, number]
	let machinistArgs: [Worker, number, number]
	let farmerArgs: [Farmer, number, number]

	beforeEach(() => {
		const setup = gameBoardWithTwoPlayers()
		gameBoard = setup.gameBoard
		one = setup.one
		const carpenter = new Carpenter()
		const herder = new Herder()
		const machinist = new Machinist()
		gameBoard.jobMarket = [carpenter, herder, machinist]
		carpenterArgs = [carpenter, CARPENTER_INDEX, 7]
		herderArgs = [herder, HERDER_INDEX, 7]
		machinistArgs = [machinist, MACHINIST_INDEX, 7]
		farmerArgs = [new HiredFarmer(), -1, 7]
	})

	it("should hire worker for player", () => {
		new HireWorkerOption(...carpenterArgs).resolve(gameBoard, one)
		expect(gameBoard.jobMarket[CARPENTER_INDEX]).toEqual(new TakenJobMarketSlot())
		expect(one.coins).toBe(0)
		expect(one.carpenters).toHaveLength(2)
	})

	describe("instant effects for hiring herders", () => {
		it("should give exchange token for 2nd herder", () => {
			const options = new HireWorkerOption(...herderArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new GainExchangeTokenOption(), new ForfeitOption())])
		})

		it("should give gain 3 gold and remove card options for 3rd herder", () => {
			one.herders.push(new Herder())
			const options = new HireWorkerOption(...herderArgs).resolve(gameBoard, one)
			expect(options).toEqual([
				new OrOption(new OneByOneOption(new GainCoinOption(2), new RemoveCardOptions(new AnyCard())), new ForfeitOption()),
			])
		})

		it("should give give exchange token for 4th herder", () => {
			one.herders.push(new Herder(), new Herder())
			const options = new HireWorkerOption(...herderArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new GainExchangeTokenOption(), new ForfeitOption())])
		})

		it("should give give nothing for 5th herder", () => {
			one.herders.push(new Herder(), new Herder(), new Herder())
			expect(new HireWorkerOption(...herderArgs).resolve(gameBoard, one)).toBeEmpty()
		})

		it("should give 3 gold and buy cow options for 6th herder", () => {
			one.herders.push(new Herder(), new Herder(), new Herder(), new Herder())
			const options = new HireWorkerOption(...herderArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new OneByOneOption(new GainCoinOption(3), new BuyCowOptions()), new ForfeitOption())])
		})
	})

	describe("instant effects for hiring carpenters", () => {
		it("should give give nothing for 2nd carpenter", () => {
			expect(new HireWorkerOption(...carpenterArgs).resolve(gameBoard, one)).toBeEmpty()
		})

		it("should give give build building options for 3rd carpenter", () => {
			one.carpenters.push(new Carpenter())
			const options = new HireWorkerOption(...carpenterArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new BuildOptions(), new ForfeitOption())])
		})

		it("should give give 3 coins for 4th carpenter", () => {
			one.carpenters.push(new Carpenter(), new Carpenter())
			const options = new HireWorkerOption(...carpenterArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new GainCoinOption(3), new ForfeitOption())])
		})

		it("should give give nothing for 5th carpenter", () => {
			one.carpenters.push(new Carpenter(), new Carpenter(), new Carpenter())
			expect(new HireWorkerOption(...carpenterArgs).resolve(gameBoard, one)).toBeEmpty()
		})

		it("should give give build building for 1 gold per carpenter options for 6th carpenter", () => {
			one.carpenters.push(new Carpenter(), new Carpenter(), new Carpenter(), new Carpenter())
			const options = new HireWorkerOption(...carpenterArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new BuildOptions(1), new ForfeitOption())])
		})
	})

	describe("instant effects for hiring machinists", () => {
		it("should give remove card option for 2nd machinist", () => {
			const options = new HireWorkerOption(...machinistArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new RemoveCardOptions(new AnyCard()), new ForfeitOption())])
		})

		it("should give discard card for certificate option for 3rd machinist", () => {
			one.machinists.push(new Machinist())
			const options = new HireWorkerOption(...machinistArgs).resolve(gameBoard, one)
			expect(options).toEqual([
				new OrOption(new OneByOneOption(new CertificateOption(1), new DiscardCardOptions(new AnyCowCard())), new ForfeitOption()),
			])
		})

		it("should give move train by 2 option for 4th machinist", () => {
			one.machinists.push(new Machinist(), new Machinist())
			const options = new HireWorkerOption(...machinistArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new MoveTrainOptions(2), new ForfeitOption())])
		})

		it("should give nothing for 5th machinist", () => {
			one.machinists.push(new Machinist(), new Machinist(), new Machinist())
			expect(new HireWorkerOption(...machinistArgs).resolve(gameBoard, one)).toBeEmpty()
		})

		it.todo("should give upgrade station behind engine option for 6th machinist", () => {
			one.machinists.push(new Machinist(), new Machinist(), new Machinist(), new Machinist())
			const options = new HireWorkerOption(...machinistArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new MoveTrainOptions(2), new ForfeitOption())])
		})
	})

	describe("instant effects for hiring farmers", () => {
		it("should get one grain for 2nd farmer", () => {
			const options = new HireWorkerOption(...farmerArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new GainGrainOption(1), new ForfeitOption())])
		})

		it("should get one grain for 3rd farmer", () => {
			one.farmers.push(new HiredFarmer())
			const options = new HireWorkerOption(...farmerArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new GainGrainOption(1), new ForfeitOption())])
		})

		it("should get one token to rotterdam port 1 upgrade for 4th farmer", () => {
			one.farmers.push(new HiredFarmer(), new HiredFarmer())
			one.gainCoins(1)
			const options = new HireWorkerOption(...farmerArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new TokenToPortOptions(UpgradeType.WHITE, gameBoard.rotterdam.portOne), new ForfeitOption())])
		})

		it("should get one grain for 5th farmer", () => {
			one.farmers.push(new HiredFarmer(), new HiredFarmer(), new HiredFarmer())
			one.gainCoins(1)
			const options = new HireWorkerOption(...farmerArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new GainGrainOption(1), new ForfeitOption())])
		})

		it("should get one token to liverpool port 1 for 6th farmer", () => {
			one.farmers.push(new HiredFarmer(), new HiredFarmer(), new HiredFarmer(), new HiredFarmer())
			one.gainCoins(1)
			const options = new HireWorkerOption(...farmerArgs).resolve(gameBoard, one)
			expect(options).toEqual([new OrOption(new TokenToPortOptions(UpgradeType.BLACK, gameBoard.liverpool.portOne), new ForfeitOption())])
		})
	})
})
