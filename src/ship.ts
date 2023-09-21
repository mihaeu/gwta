import Player, { UpgradeType } from "./player.js"
import { DrawObjectiveCardOption } from "./options/drawObjectiveCardOption.js"
import { GainCoinOption } from "./options/gainCoinOption.js"

export enum ShipColor {
	NONE = "NONE",
	YELLOW = "YELLOW",
	TURQUOISE = "TURQUOISE",
	PURPLE = "PURPLE",
}

export class Ship {
	constructor(
		public readonly valueRequirement: number,
		public readonly grainRequirement: number,
		public readonly victoryPoints: number,
		public readonly color: ShipColor = ShipColor.NONE,
		public readonly destinationPort?: Player[],
		public readonly tokenColor: UpgradeType = UpgradeType.WHITE,
		public readonly maxToken: number = 1,
		public readonly reward?: DrawObjectiveCardOption | GainCoinOption,
		public readonly players: Player[] = [],
	) {}
}
