import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Building } from "../buildings/building.js"

export abstract class Option {
	protected _building?: Building
	abstract resolve(gameBoard: GameBoard, currentPlayer: Player): Option[]

	get building(): Building | undefined {
		return this._building
	}

	toString(): string {
		return this.constructor.name
	}
}
