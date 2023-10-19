import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

import { ObjectiveCard } from "../objectiveCard.js"

export class PlayObjectiveCardOption extends Option {
	constructor(private readonly objective: ObjectiveCard) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const index = currentPlayer.handCards.findIndex((card) => card instanceof ObjectiveCard && card.id === this.objective.id)
		if (index < 0) {
			throw new Error(`Objective card ${this.objective} not in hand of player. ${currentPlayer.handCards.join()}`)
		}
		currentPlayer.handCards.splice(index, 1)

		this.objective.makeMandatory()
		currentPlayer.playedObjectives.push(this.objective)
		return this.objective.benefit.resolve(gameBoard, currentPlayer)
	}

	toString(): string {
		return `${super.toString()}(${this.objective})`
	}
}
