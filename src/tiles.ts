export interface Tile {}
export enum HandColor {
	GREEN,
	BLACK,
}
export class Farmer implements Tile {
	constructor(
		private readonly hand: HandColor,
		private readonly strength: 3 | 4 | 5 | 6 | 7 | 8,
	) {
		this.hand = hand
		this.strength = strength
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
