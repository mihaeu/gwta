import { Option } from "./options/option.js"
import { Objectives } from "./objectives.js"
import { Card } from "./cards.js"

export class ObjectiveCard implements Card {
	constructor(
		public readonly id: number,
		public readonly benefit: Option,
		public readonly victoryPointsFulfilled: number,
		public readonly victoryPointsUnfulfilled: number,
		public readonly objectives: Objectives,
		public isOptional: boolean = true,
	) {}

	makeMandatory() {
		this.isOptional = false
	}

	toString(): string {
		return `${this.constructor.name}(${this.benefit},${this.victoryPointsFulfilled},${this.victoryPointsUnfulfilled})`
	}
}
