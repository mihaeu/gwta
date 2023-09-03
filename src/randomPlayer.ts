import Player from "./player.js"
import { Option } from "./options/option.js"
import GameBoard from "./gameBoard.js"

export default class RandomPlayer extends Player {
	constructor(name: string) {
		super(name, GameBoard.START)
	}

	chooseOption(options: Option[]): Promise<Option> {
		return Promise.resolve(options[Math.round(Math.random() * (options.length - 1))])
	}
}
