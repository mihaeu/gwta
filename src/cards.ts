export interface Card {}
export class AnyCard implements Card {}

export class Objective implements Card {}
export class ExhaustionCard implements Card {}
export abstract class CowCard implements Card {
	private readonly _value: number
	private readonly _strength: number
	private readonly _victoryPoints: number

	protected constructor(value: number, strength: number, victoryPoints: number) {
		this._value = value
		this._strength = strength
		this._victoryPoints = victoryPoints
	}

	equals(other: CowCard): boolean {
		return (
			this.constructor.name === other.constructor.name &&
			this._value === other._value &&
			this._strength === other._strength &&
			this._victoryPoints === other._victoryPoints
		)
	}

	toString(): string {
		return `${this.constructor.name}(value:${this.value},strength:${this.strength},victoryPoints:${this.victoryPoints})`
	}

	get value(): number {
		return this._value
	}

	get strength(): number {
		return this._strength
	}

	get victoryPoints(): number {
		return this._victoryPoints
	}
}

export class AnyCowCard extends CowCard {
	constructor() {
		super(0, 0, 0)
	}
}

export class Niata extends CowCard {
	constructor() {
		super(1, 1, 0)
	}
}

export class Patagonico extends CowCard {
	constructor() {
		super(2, 2, 0)
	}
}

export class Fronterizo extends CowCard {
	constructor() {
		super(2, 2, 0)
	}
}

export class HolandoArgentino extends CowCard {
	constructor() {
		super(2, 2, 0)
	}
}

export class Caracu extends CowCard {
	constructor(victoryPoints: number) {
		super(1, 7, victoryPoints)
	}
}

export class Chaquenyo extends CowCard {
	constructor() {
		super(3, 5, 1)
	}
}

export class Serrano extends CowCard {
	constructor() {
		super(3, 4, 2)
	}
}

export class BlancoOrejinegro extends CowCard {
	constructor() {
		super(3, 3, 3)
	}
}

export class Franqueiro extends CowCard {
	constructor(victoryPoints: number) {
		super(4, 6, victoryPoints)
	}
}

export class AberdeenAngus extends CowCard {
	constructor(victoryPoints: number) {
		super(5, 7, victoryPoints)
	}
}
