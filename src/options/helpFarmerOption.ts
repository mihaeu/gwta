import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"
import { FarmerNode } from "../nodes.js"
import { CowCard, ExhaustionCard } from "../cards.js"
import { HireWorkerOption } from "./hireWorkerOption.js"
import { OneByOneOption } from "./oneByOneOption.js"
import { Farmer } from "../farmer.js"

export class HelpFarmerOption extends Option {
	private static readonly FARMER_COSTS = [0, 0, 6, 6, 8, 8, 10]

	constructor(
		private readonly farmerLocations: FarmerNode[],
		private readonly cowsUsed: CowCard[],
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const farmers = this.farmerLocations.map((farmerLocation) => {
			if (farmerLocation.reward > 0) {
				currentPlayer.gainCoins(farmerLocation.reward)
			}
			return farmerLocation.helpFarmer()
		})
		this.cowsUsed.forEach((cow) => currentPlayer.discardCard(cow))
		if (this.cowsUsed.length > 0) {
			currentPlayer.discardedCards.push(new ExhaustionCard())
		}
		if (this.cowsUsed.length > 2) {
			currentPlayer.discardedCards.push(new ExhaustionCard())
		}

		const options = this.createHiringOptions(currentPlayer, farmers)
		this.addRemainingFarmersToHelpedFarmers(farmers, options, currentPlayer)
		return options.length > 0 ? [new OneByOneOption(...options)] : []
	}

	private createHiringOptions(currentPlayer: Player, farmers: Farmer[]) {
		let hiredFarmers = currentPlayer.farmers.length
		let spentGold = 0
		const options: Option[] = []
		for (const farmer of farmers) {
			if (hiredFarmers >= Player.MAX_WORKERS) {
				break
			}

			const cost = HelpFarmerOption.FARMER_COSTS[hiredFarmers + 1]
			if (cost >= currentPlayer.coins - spentGold) {
				break
			}

			options.push(new HireWorkerOption(farmer, -1, cost))
			spentGold += cost
			hiredFarmers += 1
		}
		return options
	}

	private addRemainingFarmersToHelpedFarmers(farmers: Farmer[], options: Option[], currentPlayer: Player) {
		farmers.slice(options.length).forEach((farmer) => {
			currentPlayer.helpFarmer(farmer)
		})
	}

	toString(): string {
		return `${super.toString()}(helped:${this.farmerLocations},with:${this.cowsUsed})`
	}
}
