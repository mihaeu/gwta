import { Option } from "../options/option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Tile } from "../tiles.js"
import { TileOption } from "../options/tileOption.js"

export class TileOptions extends Option {
	constructor(private readonly tiles: Tile[]) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.tiles.map((_, index, tiles) => new TileOption(index, tiles))
	}
}
