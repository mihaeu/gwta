import Player, { UpgradeType } from "./player.js"
import GameBoard from "./gameBoard.js"
import { BuenosAiresNode, BuildingNode, FarmerNode } from "./nodes.js"
import { AnyCard, Card, CowCard, ExhaustionCard } from "./cards.js"
import { Option } from "./options/option.js"
import { MoveOptions } from "./actions/moveOptions.js"
import { TileOptions } from "./actions/tileOptions.js"
import { DiscardCardOptions } from "./actions/discardCardOptions.js"
import { AuxiliaryActionOptions } from "./actions/auxiliaryActionOptions.js"
import { LocationOptions } from "./actions/locationOptions.js"
import { PassOption } from "./options/passOption.js"
import { ordinal } from "./util.js"
import { MoveOption } from "./options/moveOption.js"
import { BuenosAiresStepOneOptions } from "./actions/buenosAiresStepOneOptions.js"
import { PortSpace } from "./port/port.js"

export default class Engine {
	private readonly gameBoard: GameBoard
	private readonly players: Player[]

	constructor(players: Player[]) {
		this.gameBoard = new GameBoard(players)
		this.players = players

		const playerBuildings = new Array(10).fill(null).map((_) => Math.round(Math.random()))
		this.players.forEach((player, index) => {
			player.gainCoins(Player.STARTING_COINS + index)
			player.drawCards(Player.CARD_LIMIT)
			player.setStartBuildings(playerBuildings)
		})
		this.gameBoard.railroadTrackWithoutStationMasterSpaces[0] = players
	}

	async play(): Promise<GameBoard> {
		while (!this.isGameOver()) {
			const currentPlayer = this.gameBoard.nextPlayer()
			await this.phaseA(currentPlayer)
			await this.phaseB(currentPlayer)
			await this.phaseC(currentPlayer)
		}
		return this.gameBoard
	}

	isGameOver(): boolean {
		return this.gameBoard.jobMarket.length >= 23
	}

	async phaseA(currentPlayer: Player) {
		const previousLocation = currentPlayer.location
		console.info(`Player ${currentPlayer.name} is on ${previousLocation.constructor.name} and takes a turn.`)
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
		const currentLocation = currentPlayer.location
		if (currentLocation instanceof BuenosAiresNode) {
			await this.buenosAiresStepOne(currentPlayer)
			this.buenosAiresStepTwo(currentPlayer)
			// this.buenosAiresStepThree(currentPlayer)
			await this.buenosAiresStepFour(currentPlayer)
			await this.buenosAiresStepFive(currentPlayer)
			await this.buenosAiresStepSix(currentPlayer)
		}

		if (currentLocation instanceof BuildingNode || currentLocation instanceof FarmerNode) {
			const locationHasOptions = currentLocation.options(this.gameBoard, currentPlayer).length > 0
			const initialPhaseBOptions = locationHasOptions
				? [new LocationOptions(currentLocation), new AuxiliaryActionOptions(currentLocation)]
				: [new AuxiliaryActionOptions(currentLocation)]
			const chosenOption = await currentPlayer.chooseOption(initialPhaseBOptions)
			if (chosenOption instanceof AuxiliaryActionOptions) {
				const chosenAuxiliaryActionOption = await currentPlayer.chooseOption(chosenOption.resolve(this.gameBoard, currentPlayer))
				let subOptions = chosenAuxiliaryActionOption.resolve(this.gameBoard, currentPlayer)
				while (subOptions.length > 0) {
					const chosenSubOption = await currentPlayer.chooseOption(subOptions)
					subOptions = chosenSubOption.resolve(this.gameBoard, currentPlayer)
					if (subOptions.length === 1) {
						subOptions = subOptions[0].resolve(this.gameBoard, currentPlayer)
					}
				}
			}
			if (chosenOption instanceof LocationOptions) {
				let locationOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
				const takenOptions: Option[] = []
				while (locationOptions.length > 0) {
					let chosenLocationOption = locationOptions.length > 1 ? await currentPlayer.chooseOption(locationOptions) : locationOptions[0]
					takenOptions.push(chosenLocationOption)
					if (chosenLocationOption instanceof MoveOption) {
						chosenLocationOption.resolve(this.gameBoard, currentPlayer)
						await this.phaseB(currentPlayer)
						break
					}

					if (chosenLocationOption instanceof PassOption) {
						break
					}
					let subOptions = chosenLocationOption.resolve(this.gameBoard, currentPlayer)
					while (subOptions.length > 0) {
						const chosenSubOption = await currentPlayer.chooseOption(subOptions)
						subOptions = chosenSubOption.resolve(this.gameBoard, currentPlayer)
					}
					locationOptions = chosenOption
						.resolve(this.gameBoard, currentPlayer)
						.filter((option) => !takenOptions.some((takenOption) => takenOption.toString() === option.toString()))
					if (!locationOptions.some((option) => option instanceof PassOption) && locationOptions.length > 0) {
						locationOptions.push(new PassOption())
					}
				}
			}
		}
	}

	async phaseC(currentPlayer: Player) {
		if (currentPlayer.handCards.length < Player.CARD_LIMIT) {
			currentPlayer.drawCards(Player.CARD_LIMIT - currentPlayer.handCards.length)
		} else if (currentPlayer.handCards.length > Player.CARD_LIMIT) {
			const cardsToDiscard = currentPlayer.handCards.length - Player.CARD_LIMIT
			console.log(
				`Player ${currentPlayer} has ${currentPlayer.handCards.length} card${
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
		console.info(`Player ${currentPlayer} took their ${ordinal(currentPlayer.turnsTaken())} turn.`)
	}

	private async buenosAiresStepOne(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 2")
		const options: Option[] = new BuenosAiresStepOneOptions().resolve(this.gameBoard, currentPlayer)
		if (options.length === 0) {
			return
		}

		const chosenOption = await currentPlayer.chooseOption(options)
		let subOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
		while (subOptions.length > 0) {
			const chosenOption = await currentPlayer.chooseOption(options)
			subOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
		}
	}

	private buenosAiresStepTwo(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 2")
		currentPlayer.gainCoins(this.determineValueOfHandCards(currentPlayer))
		currentPlayer.handCards.forEach((card) => card instanceof ExhaustionCard && currentPlayer.removeCard(card))
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

	endgameScoring() {
		const score: any[] = []
		this.players.forEach((player) => {
			const buildings = this.gameBoard.playerBuildings(player).reduce((sum, playerLocation) => {
				return sum + playerLocation.building().victoryPoints
			}, 0)
			const tokenEqualsPlayer = (token: Player) => token.equals(player)
			const playerOnSpace = (space: PortSpace) => space.player === player
			let ports =
				(this.gameBoard.leHavre.portTwo?.filter(tokenEqualsPlayer).length ?? 0) +
				this.gameBoard.rotterdam.portOne.filter(tokenEqualsPlayer).length * 2 +
				this.gameBoard.liverpool.portOne.filter(tokenEqualsPlayer).length * 5 +
				(this.gameBoard.liverpool.portTwo?.filter(tokenEqualsPlayer).length ?? 0) * 8 +
				this.gameBoard.leHavre.west.spaces
					.filter(playerOnSpace)
					.concat(this.gameBoard.leHavre.north.spaces.filter(playerOnSpace))
					.concat(this.gameBoard.leHavre.south.spaces.filter(playerOnSpace))
					.concat(this.gameBoard.leHavre.east.spaces.filter(playerOnSpace))
					.concat(this.gameBoard.rotterdam.west.spaces.filter(playerOnSpace))
					.concat(this.gameBoard.rotterdam.north.spaces.filter(playerOnSpace))
					.concat(this.gameBoard.rotterdam.south.spaces.filter(playerOnSpace))
					.concat(this.gameBoard.rotterdam.east.spaces.filter(playerOnSpace))
					.concat(this.gameBoard.liverpool.west.spaces.filter(playerOnSpace))
					.concat(this.gameBoard.liverpool.north.spaces.filter(playerOnSpace))
					.concat(this.gameBoard.liverpool.south.spaces.filter(playerOnSpace))
					.concat(this.gameBoard.liverpool.east.spaces.filter(playerOnSpace))
					.reduce((sum, portSpace) => sum + portSpace.victoryPoints, 0)

			const playerScore = {
				coins: Math.floor(player.coins / 5),
				buildings,
				ports,
				trainStations: 0,
				helpedFarmers: 0,
				cowCards: player.handCards
					.concat(player.discardedCards)
					.concat(player.cards)
					.reduce((sum: number, card) => (card instanceof CowCard ? sum + card.victoryPoints : sum), 0),
				fulfilledObjectiveCards: 0,
				stationMasters: 0,
				fifthAndSixthWorkers:
					(player.carpenters.length > 4 ? (player.carpenters.length - 4) * 4 : 0) +
					(player.machinists.length > 4 ? (player.machinists.length - 4) * 4 : 0) +
					(player.herders.length > 4 ? (player.herders.length - 4) * 4 : 0) +
					(player.farmers.length > 4 ? (player.farmers.length - 4) * 4 : 0),
				secondMovementUpgrade: player.upgrades.movementUpgradeTwo === UpgradeType.UPGRADED ? 2 : 0,
				jobMarketToken: 0,
			}
			score.push(playerScore)
		})
		return score
	}
}
