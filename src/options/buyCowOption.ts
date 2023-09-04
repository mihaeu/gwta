import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"
import { CowCard } from "../cards.js"

export class BuyCowOption extends Option {
	constructor(
		private readonly cow: CowCard,
		public readonly cost: number,
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.pay(this.cost)
		const index = gameBoard.cowMarket.findIndex((cowCard) => this.cow.equals(cowCard))
		currentPlayer.discardedCards.push(gameBoard.cowMarket.splice(index, 1)[0])
		return []
	}

	toString(): string {
		return `${super.toString()}(${this.cow.constructor.name},${this.cost})`
	}
}
