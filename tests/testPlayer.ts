import Player from "../src/player.js"
import { Option } from "../src/options/option.js"

export class TestPlayer extends Player {
	public callArgs: Option[][] = []
	public callCount = 0
	public selectOptionMock = function (options: Option[]) {
		return options[0]
	}

	constructor(name: string) {
		super(name)
	}

	async chooseOption(options: Option[]): Promise<Option> {
		++this.callCount
		this.callArgs[this.callCount] = options
		return Promise.resolve(this.selectOptionMock(options))
	}
}
