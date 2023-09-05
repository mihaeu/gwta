import GameBoard from "./gameBoard.js"
import Player from "./player.js"
import { Option } from "./options/option.js"
import { HelpFarmerOptions } from "./actions/helpFarmerOptions.js"
import { FarmerNode } from "./nodes.js"
import { Tile } from "./tiles.js"

export enum HandColor {
	GREEN = "GREEN",
	BLACK = "BLACK",
}

export class Farmer extends Tile {
	constructor(
		private readonly hand: HandColor,
		private readonly _strength: 3 | 4 | 5 | 6 | 7 | 8,
	) {
		super()
		this.hand = hand
		this._strength = _strength
	}

	get strength(): 3 | 4 | 5 | 6 | 7 | 8 {
		return this._strength
	}

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const helpFarmerOptions = new HelpFarmerOptions(0, currentPlayer.location as FarmerNode)
		if (helpFarmerOptions.resolve(gameBoard, currentPlayer).length === 0) {
			return []
		}

		return [helpFarmerOptions]
	}

	toString(): string {
		return `${this.constructor.name}(${this.hand},${this._strength})`
	}
}

export class BlueFarmer extends Farmer {}

export class GreenFarmer extends Farmer {}

export class OrangeFarmer extends Farmer {}

export class YellowFarmer extends Farmer {}
