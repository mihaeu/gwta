import Player from "./player.js"
import { Option } from "./options/option.js"
import * as readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import GameBoard from "./gameBoard.js"

export default class CommandLinePlayer extends Player {
	private readonly readline: readline.Interface
	public gameBoard?: GameBoard

	constructor(name: string) {
		super(name)
		this.readline = readline.createInterface({ input, output })
	}

	async chooseOption(options: Option[]): Promise<Option> {
		console.log(
			`Choose the index of one of the following actions:
${options.map((option, index) => `${index}: ${option.toString()}`).join("\n")}`,
		)

		let index = -1
		while (options[index] === undefined) {
			let response = await this.readline.question("Index: ")
			if (response === ".score" && this.gameBoard !== undefined) {
				console.log(this.gameBoard.endgameScoring())
			}
			index = parseInt(response, 10)
		}

		console.log(`Player ${this} chose ${options[index]}.`)
		return Promise.resolve(options[index])
	}
}
