import { Action } from "./actions/action.js"
import { AuxiliaryAction } from "./actions/auxiliaryAction.js"

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
	actions(): Action[] {
		return [new AuxiliaryAction()]
	}
}
export class BlueFarmer extends Farmer {}
export class GreenFarmer extends Farmer {}
export class OrangeFarmer extends Farmer {}
export class YellowFarmer extends Farmer {}
export class Worker implements Tile {
	private readonly strong: boolean = false

	constructor(strong: boolean = false) {
		this.strong = strong
	}
}

export class Herder extends Worker {}
export class Carpenter extends Worker {}
export class Machinist extends Worker {}
export class JobMarketToken {}
