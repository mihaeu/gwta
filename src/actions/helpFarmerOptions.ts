import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { getAllCombinations } from "../util.js"
import { CowCard } from "../cards.js"
import { HelpFarmerOption } from "../options/helpFarmerOption.js"

export class HelpFarmerOptions extends Option {
	constructor(private readonly modifier: number) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const farmers = gameBoard.yellowFarmers
			.concat(gameBoard.blueFarmers, gameBoard.greenFarmers, gameBoard.orangeFarmers)
			.filter((farmerLocation) => !farmerLocation.isEmpty())
		if (farmers.length === 0) {
			return []
		}

		const strengthWithoutCards = currentPlayer.strength() + this.modifier
		const strengthCombinationWithCards = getAllCombinations(currentPlayer.handCards).map((cards) => {
			const strengthOfCards = cards
				.filter((card) => card instanceof CowCard)
				.reduce((sum: number, current) => sum + (current as CowCard).strength, strengthWithoutCards)
			return {
				cards,
				strengthOfCards,
			}
		})

		const options = new Map<string, Option>()
		const combinationsOfFarmers = getAllCombinations(farmers).filter((combination) => combination.length <= 3)
		for (const farmerCombination of combinationsOfFarmers) {
			const requiredStrength = farmerCombination.reduce((sum: number, farmer) => {
				return sum + farmer.requiredStrength()
			}, 0)
			for (const cardCombination of strengthCombinationWithCards) {
				if (requiredStrength <= cardCombination.strengthOfCards) {
					const option = new HelpFarmerOption(farmerCombination, cardCombination.cards as CowCard[])
					options.set(option.toString(), option)
				}
			}
		}

		return [...options.values()]
	}
}
