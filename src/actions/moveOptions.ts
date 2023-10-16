import { Option } from "../options/option.js"
import GameBoard from "../gameBoard.js"
import Player, { UpgradeType } from "../player.js"
import { BuenosAiresNode, Node } from "../nodes.js"
import { MoveOption } from "../options/moveOption.js"

export class MoveOptions extends Option {
	constructor(private readonly distance = 0) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const moveDistance = this.getMoveDistance(gameBoard, currentPlayer)
		const railroadDevelopment = gameBoard.railroadTrackWithoutStationMasterSpaces.findIndex(
			(railroadStop) => railroadStop && railroadStop.find((player) => currentPlayer.name === player.name),
		)
		const availableMoves = new Map<string, Node>()
		currentPlayer.location.nextNonEmptyDescendants(railroadDevelopment).forEach((node) => availableMoves.set(node.toString(), node))

		let lastMoves: Node[] = [...availableMoves.values()]
		for (let distance = 2; distance <= moveDistance; ++distance) {
			let movesOfCurrentDistance: Node[] = lastMoves.reduce((moves, currentMove) => {
				if (currentMove instanceof BuenosAiresNode) {
					return moves
				}
				return !moves
					? currentMove.nextNonEmptyDescendants(railroadDevelopment)
					: moves.concat(currentMove.nextNonEmptyDescendants(railroadDevelopment))
			}, new Array<Node>())
			movesOfCurrentDistance.forEach((move) => availableMoves.set(move.toString(), move))
			lastMoves = movesOfCurrentDistance
		}
		return [...availableMoves.values()].map((location) => new MoveOption(location))
	}

	private getMoveDistance(gameBoard: GameBoard, currentPlayer: Player) {
		let moveDistance = gameBoard.players.length === 1 ? 3 : gameBoard.players.length + 1
		moveDistance += currentPlayer.upgrades.movementUpgradeOne === UpgradeType.UPGRADED ? 2 : 0
		moveDistance += currentPlayer.upgrades.movementUpgradeTwo === UpgradeType.UPGRADED ? 1 : 0
		return this.distance ? this.distance : moveDistance
	}
}
