import { AuxiliaryActionOptions } from "./actions/auxiliaryActionOptions.js"
import Player from "./player.js"
import { Option } from "./options/option.js"

export interface Tile {}
export enum HandColor {
	GREEN = "GREEN",
	BLACK = "BLACK",
}
export class Farmer implements Tile {
	constructor(
		private readonly hand: HandColor,
		private readonly strength: 3 | 4 | 5 | 6 | 7 | 8,
	) {
		this.hand = hand
		this.strength = strength
	}

	/**
	 * TODO help farmer action is missing
	 */
	options(): Option[] {
		return [new AuxiliaryActionOptions()]
	}
}
export class BlueFarmer extends Farmer {}
export class GreenFarmer extends Farmer {}
export class OrangeFarmer extends Farmer {}
export class YellowFarmer extends Farmer {}
export class Worker implements Tile, JobMarketItem {
	public readonly strong: boolean = false

	constructor(strong: boolean = false) {
		this.strong = strong
	}
}

export interface JobMarketItem {}
export class Herder extends Worker {}
export class Carpenter extends Worker {}
export class Machinist extends Worker {}
export class JobMarketToken implements JobMarketItem {}
export class EmptyJobMarketSlot implements JobMarketItem {}
export class TakenJobMarketSlot implements JobMarketItem {
	constructor(private readonly player: Player) {}
}
