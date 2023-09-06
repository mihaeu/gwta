import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { EmptyJobMarketSlot, JobMarketToken, Tile, Worker } from "../tiles.js"
import { BlueFarmer, Farmer, GreenFarmer, OrangeFarmer, YellowFarmer } from "../farmer.js"

export class TileOption extends Option {
	constructor(
		private readonly index: number,
		private readonly tiles: Tile[],
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const chosenTile = this.tiles[this.index]
		console.log(`Chose ${chosenTile} from ${this.tiles}`)

		if (chosenTile instanceof Farmer) {
			if (chosenTile instanceof GreenFarmer) {
				const firstEmptyFarmer = gameBoard.greenFarmers.find((farmer) => farmer.isEmpty())
				if (firstEmptyFarmer) {
					firstEmptyFarmer.addFarmer(chosenTile)
				}
			} else if (chosenTile instanceof BlueFarmer) {
				const firstEmptyFarmer = gameBoard.blueFarmers.find((farmer) => farmer.isEmpty())
				if (firstEmptyFarmer) {
					firstEmptyFarmer.addFarmer(chosenTile)
				}
			} else if (chosenTile instanceof OrangeFarmer) {
				const firstEmptyFarmer = gameBoard.orangeFarmers.find((farmer) => farmer.isEmpty())
				if (firstEmptyFarmer) {
					firstEmptyFarmer.addFarmer(chosenTile)
				}
			} else if (chosenTile instanceof YellowFarmer) {
				const firstEmptyFarmer = gameBoard.yellowFarmers.find((farmer) => farmer.isEmpty())
				if (firstEmptyFarmer) {
					firstEmptyFarmer.addFarmer(chosenTile)
				}
			}
			gameBoard.foresightSpacesA[this.index] = gameBoard.aTiles.splice(0, 1)[0]
		}

		if (chosenTile instanceof Worker) {
			const lastItem = gameBoard.jobMarket.length - 1
			if (gameBoard.jobMarket.some((slot) => slot instanceof EmptyJobMarketSlot)) {
				for (let index = Math.floor(lastItem / 2); index < lastItem; ++index) {
					if (gameBoard.jobMarket[index] instanceof EmptyJobMarketSlot) {
						gameBoard.jobMarket[index] = chosenTile
						break
					}
				}
			} else {
				gameBoard.jobMarket[lastItem] = chosenTile
				gameBoard.jobMarket = gameBoard.jobMarket.concat(
					[...new Array(gameBoard.players.length - 1).fill(new EmptyJobMarketSlot())],
					new JobMarketToken(),
				)
			}
		}

		return []
	}

	toString(): string {
		return `${super.toString()}(${this.tiles[this.index].constructor.name})`
	}
}
