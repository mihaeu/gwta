import GameBoard from "../gameBoard.js"
import Player, { Upgrades, UpgradeType } from "../player.js"
import { Option } from "./option.js"

export class TokenToPortOption extends Option {
	constructor(
		private readonly upgrade: keyof Upgrades,
		private readonly port: Player[],
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.upgrades[this.upgrade] = UpgradeType.UPGRADED
		this.port.push(currentPlayer)
		return []
	}
}
