export interface Card {}
export abstract class CowCard implements Card {
	private readonly _value: number
	private readonly _strength: number
	private readonly _victoryPoints: number

	constructor(value: number, strength: number, victoryPoints: number) {
		this._value = value
		this._strength = strength
		this._victoryPoints = victoryPoints
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
export class Niata extends CowCard {
	public readonly COUNT = 5
}
export class Patagonico extends CowCard {
	public readonly COUNT = 3
}
export class Fronterizo extends CowCard {
	public readonly COUNT = 3
}
export class HolandoArgentino extends CowCard {
	public readonly COUNT = 3
}
export class Caracu extends CowCard {
	public readonly COUNT = 5
}
export class Chaquenyo extends CowCard {
	public readonly COUNT = 5
}
export class Serrano extends CowCard {
	public readonly COUNT = 5
}
export class BlancoOrejinegro extends CowCard {
	public readonly COUNT = 5
}
export class Franqueiro extends CowCard {
	public readonly COUNT = 9
}
export class AberdeenAngus extends CowCard {
	public readonly COUNT = 6
}
