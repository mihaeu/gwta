import Player from "./player.js"
import { Option } from "./options/option.js"
import { LocationOptions } from "./actions/locationOptions.js"
import { PassOption } from "./options/passOption.js"
import { MoveOption } from "./options/moveOption.js"
import { FarmerNode } from "./nodes.js"

export default class SlightlySmarterRandomPlayer extends Player {
	constructor(name: string) {
		super(name)
	}

	chooseOption(options: Option[]): Promise<Option> {
		// if you can do a location option do it instead of an aux action
		const locationOptions = options.find((option) => option instanceof LocationOptions)
		if (locationOptions) {
			return Promise.resolve(locationOptions)
		}

		let filteredOptions = options

		// if there are things to do, don't pass
		if (options.length > 1) {
			filteredOptions = filteredOptions.filter((option) => !(option instanceof PassOption))
		}

		// avoid farmers
		if (
			options.every((option) => option instanceof MoveOption) &&
			options.some((option) => !((option as MoveOption).location instanceof FarmerNode))
		) {
			filteredOptions = options.filter((option) => !((option as MoveOption).location instanceof FarmerNode))
		}

		return Promise.resolve(filteredOptions[Math.round(Math.random() * (filteredOptions.length - 1))])
	}
}
