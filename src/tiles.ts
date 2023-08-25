export interface Tile {}
export class Farmer implements Tile {}
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
