import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { Port } from "../port/port.js"
import { BuenosAiresStepOneOption } from "../options/buenosAiresStepOneOption.js"
import { ForfeitOption } from "../options/forfeitOption.js"

export class BuenosAiresStepOneOptions extends Option {
	optionsForPortDistrict(currentPlayer: Player, port: Port, availableGrain: number): Option[] {
		const isPlayerOnPortOne = port.portOne.some((player) => player.equals(currentPlayer))
		const isPlayerOnPortTwo = port.portTwo?.some((player) => player.equals(currentPlayer)) ?? false
		if (!isPlayerOnPortOne && !isPlayerOnPortTwo) {
			return []
		}

		let options: Option[] = []
		for (let portDistrict of [port.west, port.north, port.east, port.south]) {
			if (isPlayerOnPortOne && availableGrain >= portDistrict.cost && isPlayerOnPortOne) {
				options = portDistrict.spaces
					.filter((portSpace) => portSpace.player === undefined)
					.map((portSpace) => new BuenosAiresStepOneOption(port.portOne, portSpace, portDistrict.cost))
			}

			const grainCost = portDistrict.cost - (port.portTwoDiscount ?? 0) > 0 ? portDistrict.cost - (port.portTwoDiscount ?? 0) : 0
			if (isPlayerOnPortTwo && port.portTwo && port.portTwoDiscount && availableGrain >= grainCost) {
				options = options.concat(
					portDistrict.spaces
						.filter((portSpace) => portSpace.player === undefined)
						.map((portSpace) => new BuenosAiresStepOneOption(port.portTwo!, portSpace, grainCost)),
				)
			}
		}
		return options.length > 0 ? [...options, new ForfeitOption()] : []
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const availableGrain = currentPlayer.grain
		return [
			...this.optionsForPortDistrict(currentPlayer, gameBoard.leHavre, availableGrain),
			...this.optionsForPortDistrict(currentPlayer, gameBoard.rotterdam, availableGrain),
			...this.optionsForPortDistrict(currentPlayer, gameBoard.liverpool, availableGrain),
		]
	}
}
