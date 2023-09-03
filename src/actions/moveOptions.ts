import { Option } from "../options/option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { BuenosAiresNode, Node } from "../nodes.js"
import { MoveOption } from "../options/moveOption.js"

export class MoveOptions extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const moveDistance = currentPlayer.moveDistance
		const railroadDevelopment = gameBoard.railroadTrackWithoutStationMasterSpaces.findIndex(
			(railroadStop) => railroadStop && railroadStop.find((player) => currentPlayer.name === player.name),
		)
		const availableMoves = new Set(currentPlayer.location.nextNonEmptyDescendants(railroadDevelopment))

		let lastMoves: Node[] = [...availableMoves]
		for (let distance = 2; distance <= moveDistance; ++distance) {
			let movesOfCurrentDistance: Node[] = lastMoves.reduce((moves, currentMove) => {
				if (currentMove instanceof BuenosAiresNode) {
					return moves
				}
				return !moves
					? currentMove.nextNonEmptyDescendants(railroadDevelopment)
					: moves.concat(currentMove.nextNonEmptyDescendants(railroadDevelopment))
			}, new Array<Node>())
			movesOfCurrentDistance.forEach((move) => availableMoves.add(move))
			lastMoves = movesOfCurrentDistance
		}
		return [...availableMoves].map((location) => new MoveOption(location))
	}
}
