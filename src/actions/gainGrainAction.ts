import { Option } from "../options/option.js"
import { Action } from "./action.js"
import { GainGrainOption } from "../options/gainGrainOption.js"

export class GainGrainAction extends Action {
	constructor(private readonly grain: number) {
		super()
	}

	options(): Option[] {
		return [new GainGrainOption(this.grain)]
	}
}
