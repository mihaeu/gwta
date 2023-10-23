import GameBoard from "../gameBoard.js"
import Player, { Upgrades, UpgradeType } from "../player.js"
import { Option } from "../options/option.js"
import { UpgradeOption } from "../options/upgradeOption.js"

export class UpgradeOptions extends Option {
	constructor(private readonly upgradeType: UpgradeType) {
		super()
	}
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const upgradeType =
			this.upgradeType === UpgradeType.WHITE && this.hasNoWhiteTokens(currentPlayer) ? UpgradeType.BLACK : this.upgradeType

		return Object.entries(currentPlayer.upgrades)
			.filter((entry) => entry[1] === upgradeType)
			.map((entry) => new UpgradeOption(entry[0] as keyof Upgrades))
	}

	private hasNoWhiteTokens(currentPlayer: Player) {
		return !Object.values(currentPlayer.upgrades).some((upgrade) => upgrade === UpgradeType.WHITE)
	}
}
