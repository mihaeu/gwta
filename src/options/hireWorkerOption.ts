import { Carpenter, Herder, Machinist, TakenJobMarketSlot, Worker } from "../tiles.js"
import GameBoard from "../gameBoard.js"
import Player, { UpgradeType } from "../player.js"
import { Option } from "./option.js"
import { Farmer } from "../farmer.js"
import { GainCoinOption } from "./gainCoinOption.js"
import { GainGrainOption } from "./gainGrainOption.js"
import { GainExchangeTokenOption } from "./gainExchangeTokenOption.js"
import { OneByOneOption } from "./oneByOneOption.js"
import { AnyCard, AnyCowCard } from "../cards.js"
import { BuyCowOptions } from "../actions/buyCowOptions.js"
import { BuildOptions } from "../actions/buildOptions.js"
import { CertificateOption } from "./certificateOption.js"
import { DiscardCardOptions } from "../actions/discardCardOptions.js"
import { MoveTrainOptions } from "../actions/moveTrainOptions.js"
import { TokenToPortOptions } from "../actions/tokenToPortOptions.js"
import { OrOption } from "./orOption.js"
import { ForfeitOption } from "./forfeitOption.js"
import { RemoveCardOptions } from "../actions/removeCardOptions.js"

export class HireWorkerOption extends Option {
	constructor(
		private readonly worker: Worker | Farmer,
		private readonly jobMarketIndex: number,
		private readonly cost: number,
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.pay(this.cost)
		if (this.jobMarketIndex >= 0) {
			gameBoard.jobMarket[this.jobMarketIndex] = new TakenJobMarketSlot()
		}
		currentPlayer.hireWorker(this.worker)
		console.log(`Player ${currentPlayer} hired ${this.worker} for ${this.cost} coins.`)

		if (this.worker instanceof Herder) {
			switch (currentPlayer.herders.length) {
				case 2:
					return [new OrOption(new GainExchangeTokenOption(), new ForfeitOption())]
				case 3:
					return [new OrOption(new OneByOneOption(new GainCoinOption(2), new RemoveCardOptions(new AnyCard())), new ForfeitOption())]
				case 4:
					return [new OrOption(new GainExchangeTokenOption(), new ForfeitOption())]
				case 5:
					break
				case 6:
					return [new OrOption(new OneByOneOption(new GainCoinOption(3), new BuyCowOptions()), new ForfeitOption())]
			}
		} else if (this.worker instanceof Carpenter) {
			switch (currentPlayer.carpenters.length) {
				case 2:
					break
				case 3:
					return [new OrOption(new BuildOptions(), new ForfeitOption())]
				case 4:
					return [new OrOption(new GainCoinOption(3), new ForfeitOption())]
				case 5:
					break
				case 6:
					return [new OrOption(new BuildOptions(1), new ForfeitOption())]
			}
		} else if (this.worker instanceof Machinist) {
			switch (currentPlayer.machinists.length) {
				case 2:
					return [new OrOption(new RemoveCardOptions(new AnyCard()), new ForfeitOption())]
				case 3:
					return [new OrOption(new OneByOneOption(new CertificateOption(1), new DiscardCardOptions(new AnyCowCard())), new ForfeitOption())]
				case 4:
					return [new OrOption(new MoveTrainOptions(2), new ForfeitOption())]
				case 5:
					break
				case 6:
					// todo
					return [new OrOption(new GainCoinOption(5), new ForfeitOption())]
			}
		} else if (this.worker instanceof Farmer) {
			switch (currentPlayer.farmers.length) {
				case 2:
					if (currentPlayer.grain < Player.MAX_GRAIN) {
						return [new OrOption(new GainGrainOption(1), new ForfeitOption())]
					}
					break
				case 3:
					if (currentPlayer.grain < Player.MAX_GRAIN) {
						return [new OrOption(new GainGrainOption(1), new ForfeitOption())]
					}
					break
				case 4:
					const rotterdamPortOptions = new TokenToPortOptions(UpgradeType.WHITE, gameBoard.rotterdam.portOne)
					if (rotterdamPortOptions.resolve(gameBoard, currentPlayer).length > 0) {
						return [new OrOption(rotterdamPortOptions, new ForfeitOption())]
					}
					break
				case 5:
					if (currentPlayer.grain < Player.MAX_GRAIN) {
						return [new OrOption(new GainGrainOption(1), new ForfeitOption())]
					}
					break
				case 6:
					const liverpoolPortOptions = new TokenToPortOptions(UpgradeType.BLACK, gameBoard.liverpool.portOne)
					if (liverpoolPortOptions.resolve(gameBoard, currentPlayer).length > 0) {
						return [new OrOption(liverpoolPortOptions, new ForfeitOption())]
					}
					break
			}
		}
		return []
	}

	toString(): string {
		return `${super.toString()}(${this.worker},${this.cost})`
	}
}
