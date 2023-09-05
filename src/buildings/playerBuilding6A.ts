import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuildingHand } from "./neutralBuilding.js"
import { PlayerBuilding } from "./playerBuilding.js"
import { Option } from "../options/option.js"
import { MoveTrainOption } from "../options/moveTrainOption.js"
import { HireWorkerOptions } from "../actions/hireWorkerOptions.js"

export class PlayerBuilding6A extends PlayerBuilding {
	public readonly hand: BuildingHand = BuildingHand.NONE
	public readonly requiredCarpenters: number = 3
	public readonly victoryPoints: number = 4

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		if (this.player && currentPlayer.name !== this.player.name) {
			return []
		}

		const options: Option[] = [new MoveTrainOption(currentPlayer.machinists.length)]
		const hireWorkerOptions = new HireWorkerOptions(-1)
		if (hireWorkerOptions.resolve(gameBoard, currentPlayer).length > 0) {
			options.push(hireWorkerOptions)
		}
		return options
	}
}
