import Player from "./player.js"
import GameBoard from "./gameBoard.js"
import { BuenosAiresNode, BuildingNode, Node } from "./nodes.js"
import { BlueFarmer, GreenFarmer, JobMarketToken, OrangeFarmer, YellowFarmer } from "./tiles.js"
import { Card, CowCard } from "./cards.js"
import { Action } from "./actions/action.js"

export default class Engine {
	private readonly gameBoard: GameBoard
	private readonly players: Player[]
	private readonly STARTING_COINS = 7

	constructor(gameBoard: GameBoard, players: Player[]) {
		this.gameBoard = gameBoard
		this.players = players

		this.players.forEach((player, index) => {
			player.gainCoins(this.STARTING_COINS + index)
			player.drawCards(Player.CARD_LIMIT + index)
		})
		this.gameBoard.railroadTrackWithoutStationMasterSpaces[0] = [players[0], players[1]]
	}

	nextPlayer(): Player {
		return this.players.reduce((previousPlayer, currentPlayer) =>
			previousPlayer.turnsTaken() > currentPlayer.turnsTaken() ? currentPlayer : previousPlayer,
		)
	}

	availableMoves(currentPlayer: Player): Node[] {
		const moveDistance = currentPlayer.moveDistance
		const railroadDevelopment = this.gameBoard.railroadTrackWithoutStationMasterSpaces.findIndex(
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
		return [...availableMoves]
	}

	isGameOver(): boolean {
		return this.gameBoard.jobMarket.length >= 23
	}

	phaseA(currentPlayer: Player) {
		const previousLocation = currentPlayer.location
		console.info(`Player ${currentPlayer.name} is on ${previousLocation.constructor.name} and takes a turn`)
		const availableMoves = this.availableMoves(currentPlayer)
		const chosenMove = currentPlayer.chooseMovement(availableMoves)
		const nextLocation = availableMoves[chosenMove]
		if (nextLocation === undefined) {
			console.error(`No reachable location found for player ${currentPlayer.name}.`, this.gameBoard)
			throw new Error(`No reachable location found for player ${currentPlayer.name}.`)
		}
		currentPlayer.location = nextLocation
		console.info(`Player ${currentPlayer.name} moved from ${previousLocation.constructor.name} to ${nextLocation.constructor.name}.`)
	}

	determineValueOfHandCards(currentPlayer: Player) {
		const uniqueCards = currentPlayer.handCards
			.reduce((uniqueCards: Map<string, CowCard>, currentCard: Card) => {
				if (currentCard instanceof CowCard) {
					uniqueCards.set(currentCard.constructor.name, currentCard)
				}
				return uniqueCards
			}, new Map<string, CowCard>())
			.values()
		return [...uniqueCards].reduce((value: number, card: CowCard) => value + card.value, 0)
	}

	phaseB(currentPlayer: Player) {
		if (currentPlayer.location instanceof BuenosAiresNode) {
			this.buenosAiresStepTwo(currentPlayer)
			this.buenosAiresStepFour(currentPlayer)
			this.buenosAiresStepFive(currentPlayer)
			this.buenosAiresStepSix(currentPlayer)

			console.log(`Moving player ${currentPlayer.name} to start`)
			currentPlayer.location = this.gameBoard.start
		}

		if (currentPlayer.location instanceof BuildingNode) {
			let availableActions: Action[] = []
			let actionsTaken: Action[] = []
			while (true) {
				availableActions = currentPlayer.location
					.actions(this.gameBoard, currentPlayer)
					.filter((action) => !actionsTaken.some((usedAction) => JSON.stringify(usedAction) === JSON.stringify(action)))
				if (availableActions.length === 0) {
					break
				}

				console.log(`Available actions for player `, currentPlayer.name, ` are `, availableActions)
				const chosenAction = currentPlayer.chooseAction(availableActions)
				console.log(`Player chose action `, chosenAction)
				const availableOptions = chosenAction.options(this.gameBoard, currentPlayer)
				console.log(`Available options for player `, currentPlayer.name, ` are `, availableOptions)
				const chosenOption = currentPlayer.chooseOption(availableOptions)
				console.log(`Player chose option `, chosenOption)
				chosenOption.resolve(this.gameBoard, currentPlayer)
				actionsTaken.push(chosenAction)
			}
		}
	}

	private buenosAiresStepSix(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 6")
		const chosenCIndex = currentPlayer.chooseForesightTileC(this.gameBoard.foresightSpacesC)
		const chosenCTile = this.gameBoard.foresightSpacesC[chosenCIndex]
		console.log(`Chose ${chosenCIndex} - `, chosenCTile, ` from `, this.gameBoard.foresightSpacesC)
		if (chosenCTile instanceof YellowFarmer) {
			const firstEmptyFarmer = this.gameBoard.yellowFarmers.find((farmer) => farmer.isEmpty())
			if (firstEmptyFarmer) {
				firstEmptyFarmer.addFarmer(chosenCTile)
			}
		} else {
			this.gameBoard.jobMarket[this.gameBoard.jobMarket.length - 1] = chosenCTile
			this.gameBoard.jobMarket.push(new JobMarketToken())
		}
		this.gameBoard.foresightSpacesC[chosenCIndex] = this.gameBoard.cTiles.splice(0, 1)[0]
	}

	private buenosAiresStepFive(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 5")
		const chosenBIndex = currentPlayer.chooseForesightTileB(this.gameBoard.foresightSpacesB)
		const chosenBTile = this.gameBoard.foresightSpacesB[chosenBIndex]
		console.log(`Chose ${chosenBIndex} - `, chosenBTile, ` from `, this.gameBoard.foresightSpacesB)

		this.gameBoard.jobMarket[this.gameBoard.jobMarket.length - 1] = chosenBTile
		this.gameBoard.jobMarket.push(new JobMarketToken())
		this.gameBoard.foresightSpacesB[chosenBIndex] = this.gameBoard.bTiles.splice(0, 1)[0]
	}

	private buenosAiresStepFour(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 4")
		const chosenAIndex = currentPlayer.chooseForesightTileA(this.gameBoard.foresightSpacesA)
		const chosenATile = this.gameBoard.foresightSpacesA[chosenAIndex]
		console.log(`Chose ${chosenAIndex} - `, chosenATile, `} from `, this.gameBoard.foresightSpacesA)
		if (chosenATile instanceof GreenFarmer) {
			const firstEmptyFarmer = this.gameBoard.greenFarmers.find((farmer) => farmer.isEmpty())
			if (firstEmptyFarmer) {
				firstEmptyFarmer.addFarmer(chosenATile)
			}
		} else if (chosenATile instanceof BlueFarmer) {
			const firstEmptyFarmer = this.gameBoard.blueFarmers.find((farmer) => farmer.isEmpty())
			if (firstEmptyFarmer) {
				firstEmptyFarmer.addFarmer(chosenATile)
			}
		} else if (chosenATile instanceof OrangeFarmer) {
			const firstEmptyFarmer = this.gameBoard.orangeFarmers.find((farmer) => farmer.isEmpty())
			if (firstEmptyFarmer) {
				firstEmptyFarmer.addFarmer(chosenATile)
			}
		}
		this.gameBoard.foresightSpacesA[chosenAIndex] = this.gameBoard.aTiles.splice(0, 1)[0]
	}

	private buenosAiresStepTwo(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 2")
		currentPlayer.gainCoins(this.determineValueOfHandCards(currentPlayer))
		currentPlayer.discardCards()
	}

	phaseC(currentPlayer: Player) {
		currentPlayer.discardCardOrDrawToHandLimit()
		currentPlayer.nextTurn()
		console.info(`Player ${currentPlayer.name} turns taken ${currentPlayer.turnsTaken()}`)
	}
}
