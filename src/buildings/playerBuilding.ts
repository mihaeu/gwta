import { Building } from "./building.js"
import Player from "../player.js"
import GameBoard from "../gameBoard.js"
import { Action } from "../actions/action.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"
import { BuildingHand } from "./neutralBuilding.js"

export class PlayerBuilding extends Building {
	public player?: Player
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 0
	public readonly victoryPoints: number = 0

	constructor(player?: Player) {
		super()
		this.player = player
	}

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new AuxiliaryAction()]
	}

	isOwner(currentPlayer: Player): boolean {
		return currentPlayer.name === this.player?.name
	}
}
