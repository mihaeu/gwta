import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { Building } from "../buildings/building.js"

export class LocationOptions extends Option {
	constructor(building: Building) {
		super()
		this._building = building
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return currentPlayer.location.options(gameBoard, currentPlayer)
	}

	toString(): string {
		return `${super.toString()}(${this._building})`
	}
}
