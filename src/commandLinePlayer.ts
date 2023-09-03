import { Node } from "./nodes.js"
import Player from "./player.js"
import { Option } from "./options/option.js"
import * as readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"

export default class CommandLinePlayer extends Player {
	private readonly readline: readline.Interface

	constructor(name: string, location: Node) {
		super(name, location)
		this.readline = readline.createInterface({ input, output })
	}

	async chooseOption(options: Option[]): Promise<Option> {
		console.log("Choose the index of one of the following actions: ", options)
		const index = parseInt(await this.readline.question("Index: "), 10)
		if (options[index] === undefined) {
			throw new Error("Invalid index")
		}

		return Promise.resolve(options[index])
	}
}
