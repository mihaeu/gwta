import { Option } from "../options/option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Tile, Worker } from "../tiles.js"
import { TileOption } from "../options/tileOption.js"

export class TileOptions extends Option {
	constructor(
		private readonly tiles: Tile[],
		private readonly isGameOver: boolean,
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.tiles.reduce((options: TileOption[], tile, index) => {
			if (this.isGameOver && tile instanceof Worker) {
				return options
			}
			options.push(new TileOption(index, this.tiles))
			return options
		}, [])
	}
}
