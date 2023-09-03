import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { BuyCowOption } from "../options/buyCowOption.js"

enum Cows {
	New = "NEW",
	Caracu = "Caracu",
	Chaquenyo = "Chaquenyo",
	Serrano = "Serrano",
	BlancoOrejinegro = "BlancoOrejinegro",
	Franqueiro = "Franqueiro",
	AberdeenAngus = "AberdeenAngus",
}

const costPerHerder = [
	[],
	[
		[Cows.Caracu, 4],
		[Cows.Chaquenyo, 5],
		[Cows.Serrano, 5],
		[Cows.BlancoOrejinegro, 5],
		[Cows.Franqueiro, 11],
	],
	[
		[Cows.Caracu, 4],
		[Cows.Chaquenyo, 2],
		[Cows.Serrano, 2],
		[Cows.BlancoOrejinegro, 2],
		[Cows.Franqueiro, 11],
		[Cows.AberdeenAngus, 11],
	],
	[
		[Cows.Caracu, 4],
		[Cows.Chaquenyo, 2],
		[Cows.Serrano, 2],
		[Cows.BlancoOrejinegro, 2],
		[Cows.Franqueiro, 6],
		[Cows.AberdeenAngus, 11],
	],
	[
		[Cows.Caracu, 4],
		[Cows.Chaquenyo, 2],
		[Cows.Serrano, 2],
		[Cows.BlancoOrejinegro, 2],
		[Cows.Franqueiro, 6],
		[Cows.AberdeenAngus, 6],
	],
	[
		[Cows.Caracu, 4],
		[Cows.Chaquenyo, 2],
		[Cows.Serrano, 2],
		[Cows.BlancoOrejinegro, 2],
		[Cows.Franqueiro, 6],
		[Cows.AberdeenAngus, 6],
	],
]

export class BuyCowOptions extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (gameBoard.cowMarket.length === 0) {
			return []
		}

		const herderCount = currentPlayer.herders.length
		const costs = costPerHerder[herderCount]
		return gameBoard.cowMarket
			.filter((cowCard) => {
				const costMapping = costs.find(([cowType, cost]) => cowType.toString() === cowCard.constructor.name)!
				return costMapping !== undefined && (costMapping[1] as number) <= currentPlayer.coins
			})
			.map((cowCard) => {
				const costMapping = costs.find(([cowType, cost]) => cowType.toString() === cowCard.constructor.name)!
				const cost = costMapping[1] as number
				return new BuyCowOption(cowCard, cost)
			})
	}
}
