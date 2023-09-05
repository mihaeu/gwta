import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "./option.js"

export class CertificateOption extends Option {
	constructor(private readonly count: number) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		currentPlayer.certificates += this.count
		console.log(
			`Player ${currentPlayer} ${this.count > 0 ? "increased" : "decreased"} certificates by ${this.count} and now has ${
				currentPlayer.certificates
			}`,
		)
		return []
	}

	toString(): string {
		return `${super.toString()}(${this.count})`
	}
}
