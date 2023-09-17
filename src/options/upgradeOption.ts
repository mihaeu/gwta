import GameBoard from "../gameBoard.js"
import Player, { Upgrades, UpgradeType } from "../player.js"
import { Option } from "./option.js"

export class UpgradeOption extends Option {
	constructor(private readonly upgrade: keyof Upgrades) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.upgrades[this.upgrade] = UpgradeType.UPGRADED
		return []
	}
}
