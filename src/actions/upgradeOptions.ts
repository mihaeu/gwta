import GameBoard from "../gameBoard.js"
import Player, { Upgrades, UpgradeType } from "../player.js"
import { Option } from "../options/option.js"
import { UpgradeOption } from "../options/upgradeOption.js"

export class UpgradeOptions extends Option {
	constructor(private readonly upgradeType: UpgradeType) {
		super()
	}
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		console.log(currentPlayer.upgrades, this.upgradeType)
		return Object.entries(currentPlayer.upgrades)
			.filter((entry) => entry[1] === this.upgradeType)
			.map((entry) => new UpgradeOption(entry[0] as keyof Upgrades))
	}
}
