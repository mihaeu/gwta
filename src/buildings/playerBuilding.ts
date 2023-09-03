import { Building } from "./building.js"
import Player from "../player.js"
import GameBoard from "../gameBoard.js"
import { AuxiliaryActionOptions } from "../actions/auxiliaryActionOptions.js"
import { BuildingHand } from "./neutralBuilding.js"
import { Option } from "../options/option.js"

export class PlayerBuilding extends Building {
	public player?: Player
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 0
	public readonly victoryPoints: number = 0

	constructor(player?: Player) {
		super()
		this.player = player
	}

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return [new AuxiliaryActionOptions()]
	}

	isOwner(currentPlayer: Player): boolean {
		return currentPlayer.name === this.player?.name
	}
}
