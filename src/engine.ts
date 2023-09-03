import Player from "./player.js"
import GameBoard from "./gameBoard.js"
import { BuenosAiresNode, BuildingNode, FarmerNode } from "./nodes.js"
import { AnyCard, Card, CowCard } from "./cards.js"
import { Option } from "./options/option.js"
import { MoveOptions } from "./actions/moveOptions.js"
import { TileOptions } from "./actions/tileOptions.js"
import { DiscardCardOptions } from "./actions/discardCardOptions.js"
import { PlayerBuilding1A } from "./buildings/playerBuilding1A.js"
import { PlayerBuilding1B } from "./buildings/playerBuilding1B.js"
import { PlayerBuilding2A } from "./buildings/playerBuilding2A.js"
import { PlayerBuilding2B } from "./buildings/playerBuilding2B.js"
import { PlayerBuilding3A } from "./buildings/playerBuilding3A.js"
import { PlayerBuilding3B } from "./buildings/playerBuilding3B.js"
import { PlayerBuilding4A } from "./buildings/playerBuilding4A.js"
import { PlayerBuilding4B } from "./buildings/playerBuilding4B.js"
import { PlayerBuilding5A } from "./buildings/playerBuilding5A.js"
import { PlayerBuilding5B } from "./buildings/playerBuilding5B.js"
import { PlayerBuilding6A } from "./buildings/playerBuilding6A.js"
import { PlayerBuilding6B } from "./buildings/playerBuilding6B.js"
import { PlayerBuilding7A } from "./buildings/playerBuilding7A.js"
import { PlayerBuilding7B } from "./buildings/playerBuilding7B.js"
import { PlayerBuilding8A } from "./buildings/playerBuilding8A.js"
import { PlayerBuilding8B } from "./buildings/playerBuilding8B.js"
import { PlayerBuilding9A } from "./buildings/playerBuilding9A.js"
import { PlayerBuilding9B } from "./buildings/playerBuilding9B.js"
import { PlayerBuilding10A } from "./buildings/playerBuilding10A.js"
import { PlayerBuilding10B } from "./buildings/playerBuilding10B.js"
import { PlayerBuilding } from "./buildings/playerBuilding.js"

export default class Engine {
	private readonly gameBoard: GameBoard
	private readonly players: Player[]

	constructor(players: Player[]) {
		this.gameBoard = new GameBoard()
		this.players = players

		const playerBuildings = [
			[new PlayerBuilding1A(), new PlayerBuilding1B()],
			[new PlayerBuilding2A(), new PlayerBuilding2B()],
			[new PlayerBuilding3A(), new PlayerBuilding3B()],
			[new PlayerBuilding4A(), new PlayerBuilding4B()],
			[new PlayerBuilding5A(), new PlayerBuilding5B()],
			[new PlayerBuilding6A(), new PlayerBuilding6B()],
			[new PlayerBuilding7A(), new PlayerBuilding7B()],
			[new PlayerBuilding8A(), new PlayerBuilding8B()],
			[new PlayerBuilding9A(), new PlayerBuilding9B()],
			[new PlayerBuilding10A(), new PlayerBuilding10B()],
		].map((playerBuildings: PlayerBuilding[]) => playerBuildings[Math.round(Math.random())])
		this.players.forEach((player, index) => {
			player.gainCoins(Player.STARTING_COINS + index)
			player.drawCards(Player.CARD_LIMIT)
			player.setStartBuildings([...playerBuildings])
		})
		this.gameBoard.railroadTrackWithoutStationMasterSpaces[0] = players
	}

	async play(): Promise<GameBoard> {
		while (!this.isGameOver()) {
			const currentPlayer = this.nextPlayer()
			await this.phaseA(currentPlayer)
			await this.phaseB(currentPlayer)
			await this.phaseC(currentPlayer)
		}
		return this.gameBoard
	}

	nextPlayer(): Player {
		return this.players.reduce((previousPlayer, currentPlayer) =>
			previousPlayer.turnsTaken() > currentPlayer.turnsTaken() ? currentPlayer : previousPlayer,
		)
	}

	isGameOver(): boolean {
		return this.gameBoard.jobMarket.length >= 23
	}

	async phaseA(currentPlayer: Player) {
		const previousLocation = currentPlayer.location
		console.info(`Player ${currentPlayer.name} is on ${previousLocation.constructor.name} and takes a turn`)
		const chosenMove = await currentPlayer.chooseOption(new MoveOptions().resolve(this.gameBoard, currentPlayer))
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

	async phaseB(currentPlayer: Player) {
		if (currentPlayer.location instanceof BuenosAiresNode) {
			this.buenosAiresStepTwo(currentPlayer)
			await this.buenosAiresStepFour(currentPlayer)
			await this.buenosAiresStepFive(currentPlayer)
			await this.buenosAiresStepSix(currentPlayer)
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
				actionsTaken.push(await this.chooseOptions(currentPlayer, availableOptions))
			}
		}

		if (currentPlayer.location instanceof FarmerNode) {
			const options = currentPlayer.location.options(this.gameBoard, currentPlayer)
			console.log(`Available options for player `, currentPlayer.name, ` are `, options)
			await currentPlayer.chooseOption(options)
		}
	}

	async phaseC(currentPlayer: Player) {
		if (currentPlayer.handCards.length < Player.CARD_LIMIT) {
			currentPlayer.drawCards(Player.CARD_LIMIT - currentPlayer.handCards.length)
		} else if (currentPlayer.handCards.length > Player.CARD_LIMIT) {
			const cardsToDiscard = currentPlayer.handCards.length - Player.CARD_LIMIT
			console.log(
				`Player ${currentPlayer.name} has ${currentPlayer.handCards.length} card${
					currentPlayer.handCards.length !== 1 ? "s" : ""
				} and needs to discard ${cardsToDiscard} card${cardsToDiscard !== 1 ? "s" : ""}.`,
			)
			for (let i = 0; i < cardsToDiscard; ++i) {
				const availableOptions: Option[] = new DiscardCardOptions(new AnyCard()).resolve(this.gameBoard, currentPlayer)
				const chosenOption = await currentPlayer.chooseOption(availableOptions)
				chosenOption.resolve(this.gameBoard, currentPlayer)
			}
		}

		currentPlayer.nextTurn()
		console.info(`Player ${currentPlayer.name} turns taken ${currentPlayer.turnsTaken()}`)
	}

	private async chooseOptions(currentPlayer: Player, availableActions: Option[]) {
		const chosenOption = await currentPlayer.chooseOption(availableActions)
		console.log(`Player chose action `, chosenOption)
		let availableOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
		while (availableOptions.length > 0) {
			console.log(`Available options for player `, currentPlayer.name, ` are `, availableOptions)
			const chosenOption = await currentPlayer.chooseOption(availableOptions)
			console.log(`Player chose option `, chosenOption)
			availableOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
		}
		return chosenOption
	}

	private buenosAiresStepTwo(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 2")
		currentPlayer.gainCoins(this.determineValueOfHandCards(currentPlayer))
		currentPlayer.discardCards()
	}

	private async buenosAiresStepFour(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 4")
		const options = new TileOptions(this.gameBoard.foresightSpacesA).resolve(this.gameBoard, currentPlayer)
		const chosenOption = await currentPlayer.chooseOption(options)
		chosenOption.resolve(this.gameBoard, currentPlayer)
	}

	private async buenosAiresStepFive(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 5")
		const options = new TileOptions(this.gameBoard.foresightSpacesB).resolve(this.gameBoard, currentPlayer)
		const chosenOption = await currentPlayer.chooseOption(options)
		chosenOption.resolve(this.gameBoard, currentPlayer)
	}

	private async buenosAiresStepSix(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 6")
		const options = new TileOptions(this.gameBoard.foresightSpacesC).resolve(this.gameBoard, currentPlayer)
		const chosenOption = await currentPlayer.chooseOption(options)
		chosenOption.resolve(this.gameBoard, currentPlayer)
	}
}
