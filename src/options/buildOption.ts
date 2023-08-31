import { Building } from "../buildings/building.js"
import { BuildingNode } from "../nodes.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class BuildOption extends Option {
	public readonly building: Building
	public readonly location: BuildingNode

	constructor(building: Building, location: BuildingNode) {
		super()
		this.building = building
		this.location = location
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): void {}
}
