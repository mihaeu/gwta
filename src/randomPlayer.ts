import Player from "./player.js"
import { Option } from "./options/option.js"

export default class RandomPlayer extends Player {
	constructor(name: string) {
		super(name)
	}

	chooseOption(options: Option[]): Promise<Option> {
		const option = options[Math.round(Math.random() * (options.length - 1))]
		console.log(`Player ${this} chose option ${option}.`)
		return Promise.resolve(option)
	}
}
