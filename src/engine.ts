import Player from "./player.js"
import GameBoard from "./gameBoard.js"
import { BuenosAiresNode, BuildingNode, FarmerNode } from "./nodes.js"
import { Card, CowCard } from "./cards.js"
import { Option } from "./options/option.js"
import { MoveOptions } from "./actions/moveOptions.js"
import { TileOptions } from "./actions/tileOptions.js"

export default class Engine {
	private readonly gameBoard: GameBoard
	private readonly players: Player[]

	constructor(gameBoard: GameBoard, players: Player[]) {
		this.gameBoard = gameBoard
		this.players = players

		this.players.forEach((player, index) => {
			player.gainCoins(Player.STARTING_COINS + index)
			player.drawCards(Player.CARD_LIMIT + index)
		})
		this.gameBoard.railroadTrackWithoutStationMasterSpaces[0] = players
	}

	nextPlayer(): Player {
		return this.players.reduce((previousPlayer, currentPlayer) =>
			previousPlayer.turnsTaken() > currentPlayer.turnsTaken() ? currentPlayer : previousPlayer,
		)
	}

	isGameOver(): boolean {
		return this.gameBoard.jobMarket.length >= 23
	}

	phaseA(currentPlayer: Player) {
		const previousLocation = currentPlayer.location
		console.info(`Player ${currentPlayer.name} is on ${previousLocation.constructor.name} and takes a turn`)
		const chosenMove = currentPlayer.chooseOption(new MoveOptions().resolve(this.gameBoard, currentPlayer))
		chosenMove.resolve(this.gameBoard, currentPlayer)
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
		}

		if (currentPlayer.location instanceof BuildingNode) {
			let availableOptions: Option[] = []
			let actionsTaken: Option[] = []
			while (true) {
				availableOptions = currentPlayer.location
					.options(this.gameBoard, currentPlayer)
					.filter((option) => !actionsTaken.some((usedAction) => JSON.stringify(usedAction) === JSON.stringify(option)))
				if (availableOptions.length === 0) {
					break
				}

				console.log(`Available options for player `, currentPlayer.name, ` are `, availableOptions)
				actionsTaken.push(this.chooseOptions(currentPlayer, availableOptions))
			}
		}

		if (currentPlayer.location instanceof FarmerNode) {
			const availableActions = currentPlayer.location.options(this.gameBoard, currentPlayer)
			console.log(`Available options for player `, currentPlayer.name, ` are `, availableActions)
			this.chooseOptions(currentPlayer, availableActions)
		}
	}

	private chooseOptions(currentPlayer: Player, availableActions: Option[]) {
		const chosenOption = currentPlayer.chooseOption(availableActions)
		console.log(`Player chose action `, chosenOption)
		let availableOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
		while (availableOptions.length > 0) {
			console.log(`Available options for player `, currentPlayer.name, ` are `, availableOptions)
			const chosenOption = currentPlayer.chooseOption(availableOptions)
			console.log(`Player chose option `, chosenOption)
			availableOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
		}
		return chosenOption
	}

	private buenosAiresStepFour(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 4")
		const options = new TileOptions(this.gameBoard.foresightSpacesA).resolve(this.gameBoard, currentPlayer)
		currentPlayer.chooseOption(options).resolve(this.gameBoard, currentPlayer)
	}

	private buenosAiresStepFive(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 5")
		const options = new TileOptions(this.gameBoard.foresightSpacesB).resolve(this.gameBoard, currentPlayer)
		currentPlayer.chooseOption(options).resolve(this.gameBoard, currentPlayer)
	}

	private buenosAiresStepSix(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 6")
		const options = new TileOptions(this.gameBoard.foresightSpacesC).resolve(this.gameBoard, currentPlayer)
		currentPlayer.chooseOption(options).resolve(this.gameBoard, currentPlayer)
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
