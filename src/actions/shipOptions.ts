import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { ShipOption } from "../options/shipOption.js"

export class ShipOptions extends Option {
	constructor(private readonly value: number) {
		super()
	}
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return gameBoard.availableShips
			.filter(
				(ship) =>
					ship.valueRequirement <= this.value && (ship.maxToken > 1 || !ship.players.some((player) => player.equals(currentPlayer))),
			)
			.map((ship) => new ShipOption(ship))
	}
}
