import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Action } from "../actions/action.js"
import { Building } from "./building.js"
import { AuxiliaryAction } from "../actions/auxiliaryAction.js"

export enum BuildingHand {
	NONE = "NONE",
	BLACK = "BLACK",
	GREEN = "GREEN",
}

export class NeutralBuilding extends Building {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new AuxiliaryAction()]
	}
}
export class NeutralBuildingC extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new AuxiliaryAction()]
	}
}
export class NeutralBuildingD extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new AuxiliaryAction()]
	}
}
export class NeutralBuildingE extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new AuxiliaryAction()]
	}
}
export class NeutralBuildingF extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new AuxiliaryAction()]
	}
}
export class NeutralBuildingG extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new AuxiliaryAction()]
	}
}
export class NeutralBuildingH extends NeutralBuilding {
	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		return [new AuxiliaryAction()]
	}
}
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
export class PlayerBuilding2A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 1
	public readonly victoryPoints: number = 1

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding3A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.BLACK
	public readonly requiredCarpenters: number = 2
	public readonly victoryPoints: number = 3

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding4A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 2
	public readonly victoryPoints: number = 3

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding5A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 3
	public readonly victoryPoints: number = 4

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding6A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 3
	public readonly victoryPoints: number = 4

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding7A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.GREEN
	public readonly requiredCarpenters: number = 4
	public readonly victoryPoints: number = 5

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding8A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 5
	public readonly victoryPoints: number = 6

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding9A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.BLACK
	public readonly requiredCarpenters: number = 7
	public readonly victoryPoints: number = 10

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding10A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 9
	public readonly victoryPoints: number = 13

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding2B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 1
	public readonly victoryPoints: number = 1

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding3B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.BLACK
	public readonly requiredCarpenters: number = 2
	public readonly victoryPoints: number = 3

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding4B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 2
	public readonly victoryPoints: number = 3

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding5B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 3
	public readonly victoryPoints: number = 4

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding6B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 3
	public readonly victoryPoints: number = 4

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding7B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.GREEN
	public readonly requiredCarpenters: number = 4
	public readonly victoryPoints: number = 5

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding8B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 5
	public readonly victoryPoints: number = 6

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding9B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.BLACK
	public readonly requiredCarpenters: number = 7
	public readonly victoryPoints: number = 9

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
export class PlayerBuilding10B extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 9
	public readonly victoryPoints: number = 13

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		const actions = [new AuxiliaryAction()]
		if (this.player && currentPlayer.name !== this.player.name) {
			return actions
		}

		return actions
	}
}
