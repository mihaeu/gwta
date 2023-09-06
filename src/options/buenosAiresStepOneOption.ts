import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"
import { PortSpace } from "../port/port.js"

export class BuenosAiresStepOneOption extends Option {
	constructor(
		private readonly port: Player[],
		private readonly portSpace: PortSpace,
		private readonly grain: number,
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const indexOfPlayerOnPort = this.port.findIndex((player) => player.equals(currentPlayer))
		this.port.splice(indexOfPlayerOnPort, 1)

		this.portSpace.player = currentPlayer

		currentPlayer.useGrain(this.grain)
		return this.portSpace.reward ? this.portSpace.reward.resolve(gameBoard, currentPlayer) : []
	}

	equals(other: BuenosAiresStepOneOption): boolean {
		return this.port === other.port && this.portSpace === other.portSpace && this.grain === other.grain
	}
}
