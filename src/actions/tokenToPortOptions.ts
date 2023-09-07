import GameBoard from "../gameBoard.js"
import Player, { Upgrades, UpgradeType } from "../player.js"
import { Option } from "../options/option.js"
import { TokenToPortOption } from "../options/tokenToPortOption.js"

export class TokenToPortOptions extends Option {
	constructor(
		private readonly type: UpgradeType,
		private readonly port: Player[],
	) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const keys = Object.keys(currentPlayer.upgrades) as (keyof Upgrades)[]

		let availableUpgrades: (keyof Upgrades)[] = []

		if (this.type === UpgradeType.WHITE) {
			availableUpgrades = keys.filter((key) => currentPlayer.upgrades[key] === UpgradeType.WHITE)
		}

		if (this.type === UpgradeType.BLACK || availableUpgrades.length === 0) {
			availableUpgrades = keys.filter((key) => currentPlayer.upgrades[key] !== UpgradeType.UPGRADED)
		}

		return availableUpgrades.map((upgrade) => new TokenToPortOption(upgrade, this.port))
	}
}
