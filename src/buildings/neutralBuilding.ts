import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Building } from "./building.js"
import { AuxiliaryActionOptions } from "../actions/auxiliaryActionOptions.js"
import { Option } from "../options/option.js"

export enum BuildingHand {
	NONE = "NONE",
	BLACK = "BLACK",
	GREEN = "GREEN",
}

export class NeutralBuilding extends Building {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return [new AuxiliaryActionOptions()]
	}
}
