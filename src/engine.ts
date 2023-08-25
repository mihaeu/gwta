import Player from "./player.js"
import Map from "./map.js"
import { BuenosAiresNode, Node } from "./nodes.js"
import {
	BlueFarmer,
	GreenFarmer,
	JobMarketToken,
	OrangeFarmer,
	YellowFarmer,
} from "./tiles.js"

export default class Engine {
	private map: Map
	private players: Player[]

	constructor(map: Map, players: Player[]) {
		this.map = map
		this.players = players
	}

	nextPlayer(): Player {
		return this.players.reduce((previousPlayer, currentPlayer) =>
			previousPlayer.turnsTaken() > currentPlayer.turnsTaken()
				? currentPlayer
				: previousPlayer,
		)
	}

	availableMoves(currentPlayer: Player): Node[] {
		const moveDistance = currentPlayer.moveDistance
		const availableMoves = new Set(
			currentPlayer.location.nextNonEmptyDescendants(),
		)
		let lastMoves: Node[] = [...availableMoves]
		for (let distance = 2; distance <= moveDistance; ++distance) {
			let movesOfCurrentDistance: Node[] = lastMoves.reduce(
				(moves, currentMove) => {
					if (currentMove instanceof BuenosAiresNode) {
						return moves
					}
					return !moves
						? currentMove.nextNonEmptyDescendants()
						: moves.concat(currentMove.nextNonEmptyDescendants())
				},
				new Array<Node>(),
			)
			movesOfCurrentDistance.forEach((move) => availableMoves.add(move))
			lastMoves = movesOfCurrentDistance
		}
		return [...availableMoves]
	}

	isGameOver(): boolean {
		return this.map.jobMarket.length >= 23
	}

	phaseA(currentPlayer: Player) {
		const previousLocation = currentPlayer.location
		console.info(
			`Player ${currentPlayer.name} is on ${previousLocation.constructor.name} and takes a turn`,
		)
		const availableMoves = this.availableMoves(currentPlayer)
		const chosenMove = currentPlayer.chooseMovement(availableMoves)
		const nextLocation = availableMoves[chosenMove]
		if (nextLocation === undefined) {
			throw new Error(
				`No reachable location found for player ${currentPlayer.name}.`,
			)
		}
		currentPlayer.location = nextLocation
		console.info(
			`Player ${currentPlayer.name} moved from ${previousLocation.constructor.name} to ${nextLocation.constructor.name}.`,
		)
	}

	phaseB(currentPlayer: Player) {
		if (currentPlayer.location instanceof BuenosAiresNode) {
			console.log("Handling foresight spaces on Buenos Aires")

			const chosenAIndex = currentPlayer.chooseForesightTileA(
				this.map.foresightSpacesA,
			)
			const chosenATile = this.map.foresightSpacesA[chosenAIndex]
			console.log(
				`Chose ${chosenAIndex} - `,
				chosenATile,
				`} from `,
				this.map.foresightSpacesA,
			)
			if (chosenATile instanceof GreenFarmer) {
				const firstEmptyFarmer = this.map.greenFarmers.find((farmer) =>
					farmer.isEmpty(),
				)
				if (firstEmptyFarmer) {
					firstEmptyFarmer.addFarmer()
				}
			} else if (chosenATile instanceof BlueFarmer) {
				const firstEmptyFarmer = this.map.blueFarmers.find((farmer) =>
					farmer.isEmpty(),
				)
				if (firstEmptyFarmer) {
					firstEmptyFarmer.addFarmer()
				}
			} else if (chosenATile instanceof OrangeFarmer) {
				const firstEmptyFarmer = this.map.orangeFarmers.find((farmer) =>
					farmer.isEmpty(),
				)
				if (firstEmptyFarmer) {
					firstEmptyFarmer.addFarmer()
				}
			}
			this.map.foresightSpacesA[chosenAIndex] = this.map.aTiles.splice(0, 1)[0]

			const chosenBIndex = currentPlayer.chooseForesightTileB(
				this.map.foresightSpacesB,
			)
			const chosenBTile = this.map.foresightSpacesB[chosenBIndex]
			console.log(
				`Chose ${chosenBIndex} - `,
				chosenBTile,
				` from `,
				this.map.foresightSpacesB,
			)

			this.map.jobMarket[this.map.jobMarket.length - 1] = chosenBTile
			this.map.jobMarket.push(new JobMarketToken())
			this.map.foresightSpacesB[chosenAIndex] = this.map.bTiles.splice(0, 1)[0]

			const chosenCIndex = currentPlayer.chooseForesightTileC(
				this.map.foresightSpacesC,
			)
			const chosenCTile = this.map.foresightSpacesC[chosenCIndex]
			console.log(
				`Chose ${chosenCIndex} - `,
				chosenCTile,
				` from `,
				this.map.foresightSpacesC,
			)
			if (chosenCTile instanceof YellowFarmer) {
				const firstEmptyFarmer = this.map.yellowFarmers.find((farmer) =>
					farmer.isEmpty(),
				)
				if (firstEmptyFarmer) {
					firstEmptyFarmer.addFarmer()
				}
			} else {
				this.map.jobMarket[this.map.jobMarket.length - 1] = chosenCTile
				this.map.jobMarket.push(new JobMarketToken())
			}
			this.map.foresightSpacesC[chosenCIndex] = this.map.cTiles.splice(0, 1)[0]

			console.log(`Moving player ${currentPlayer.name} to start`)
			currentPlayer.location = this.map.start
		}
	}

	phaseC(currentPlayer: Player) {
		currentPlayer.nextTurn()
		console.info(
			`Player ${currentPlayer.name} turns taken ${currentPlayer.turnsTaken()}`,
		)
	}
}
