import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"
import { FarmerNode } from "../nodes.js"
import { CowCard } from "../cards.js"

export class HelpFarmerOption extends Option {
	constructor(
		private readonly farmerLocations: FarmerNode[],
		private readonly cowsUsed: CowCard[],
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		this.farmerLocations.forEach((farmerLocation) => {
			currentPlayer.helpFarmer(farmerLocation.helpFarmer())
		})
		this.cowsUsed.forEach((cow) => currentPlayer.discardCard(cow))
		return []
	}

	toString(): string {
		return `${super.toString()}(helped:${this.farmerLocations},with:${this.cowsUsed})`
	}
}
