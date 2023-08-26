export interface Card {}
export abstract class CowCard implements Card {
	protected readonly value: number
	protected readonly strength: number
	protected readonly victoryPoints: number

	constructor(value: number, strength: number, victoryPoints: number) {
		this.value = value
		this.strength = strength
		this.victoryPoints = victoryPoints
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
