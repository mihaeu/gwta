import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"
import { Ship } from "../ship.js"

export class ShipOption extends Option {
	constructor(private readonly ship: Ship) {
		super()
	}
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		this.ship.players.push(currentPlayer)
		if (this.ship.reward !== undefined) {
			this.ship.reward.resolve(gameBoard, currentPlayer)
		}
		if (this.ship.grainRequirement <= currentPlayer.grain) {
			currentPlayer.useGrain(this.ship.grainRequirement)
		} else {
			currentPlayer.pay((this.ship.grainRequirement - currentPlayer.grain) * 2)
			currentPlayer.useGrain(currentPlayer.grain)
		}

		return []
	}
}
