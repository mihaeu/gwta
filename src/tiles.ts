export abstract class Tile {
	abstract toString(): string
}

export class Worker implements Tile, JobMarketItem {
	public readonly strong: boolean = false

	constructor(strong: boolean = false) {
		this.strong = strong
	}

	toString(): string {
		return `${this.constructor.name}(${this.strong ? "strong" : "normal"})`
	}
}

export class JobMarketItem {
	toString(): string {
		return `${this.constructor.name}`
	}
}
export class Herder extends Worker {}
export class Carpenter extends Worker {}
export class Machinist extends Worker {}
export class JobMarketToken extends JobMarketItem {}
export class EmptyJobMarketSlot extends JobMarketItem {}
export class TakenJobMarketSlot extends JobMarketItem {}
