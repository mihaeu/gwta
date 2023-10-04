import Player from "./player.js"
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
import { ordinal, pluralize } from "./util.js"
import { MoveOption } from "./options/moveOption.js"
import { BuenosAiresStepOneOptions } from "./actions/buenosAiresStepOneOptions.js"
import { TileOption } from "./options/tileOption.js"
import { ShipColor } from "./ship.js"
import { ShipOptions } from "./actions/shipOptions.js"
import { UpgradeOptions } from "./actions/upgradeOptions.js"
import { ShipOption } from "./options/shipOption.js"

export default class Engine {
	private readonly gameBoard: GameBoard

	constructor(gameBoard: GameBoard) {
		this.gameBoard = gameBoard
	}

	async play() {
		await this.firstRound()
		while (!this.isGameOver()) {
			const currentPlayer = this.gameBoard.nextPlayer()
			await this.phaseA(currentPlayer)
			await this.phaseB(currentPlayer)
			await this.phaseC(currentPlayer)
		}
	}

	private async firstRound() {
		for (const currentPlayer of this.gameBoard.players) {
			const options = this.gameBoard.neutralBuildings.map((neutralBuildingLocation) => new MoveOption(neutralBuildingLocation))
			const chosenOption = await currentPlayer.chooseOption(options)
			chosenOption.resolve(this.gameBoard, currentPlayer)
			await this.discardExcessCards(currentPlayer, Player.STARTING_CARD_LIMIT)
			await this.phaseB(currentPlayer)
			await this.phaseC(currentPlayer)
		}
	}

	isGameOver(): boolean {
		return this.gameBoard.jobMarket.length >= this.gameBoard.players.length * 11 + 1
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
			const valueOfDelivery = await this.buenosAiresStepTwo(currentPlayer)
			await this.buenosAiresStepThree(currentPlayer, valueOfDelivery)
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
		const cardLimit = currentPlayer.cardLimit()
		if (currentPlayer.handCards.length < cardLimit) {
			currentPlayer.drawCards(cardLimit - currentPlayer.handCards.length)
		} else if (currentPlayer.handCards.length > cardLimit) {
			await this.discardExcessCards(currentPlayer, cardLimit)
		}

		currentPlayer.nextTurn()
		console.info(`Player ${currentPlayer} took their ${ordinal(currentPlayer.turnsTaken())} turn.`)
	}

	private async discardExcessCards(currentPlayer: Player, cardLimit: number) {
		const cardsToDiscard = currentPlayer.handCards.length - cardLimit
		if (cardsToDiscard <= 0) {
			return
		}
		console.log(
			`Player ${currentPlayer} has ${pluralize("card", currentPlayer.handCards.length)} and needs to discard ${pluralize(
				"card",
				cardsToDiscard,
			)}.`,
		)
		const availableOptions: Option[] = new DiscardCardOptions(new AnyCard(), cardsToDiscard).resolve(this.gameBoard, currentPlayer)
		const chosenOption = await currentPlayer.chooseOption(availableOptions)
		chosenOption.resolve(this.gameBoard, currentPlayer)
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

	private async buenosAiresStepTwo(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 2")
		const valueOfHandCards = this.determineValueOfHandCards(currentPlayer)
		currentPlayer.gainCoins(valueOfHandCards)
		console.log(`Sold cows for ${valueOfHandCards} coins.`)
		currentPlayer.handCards.forEach((card) => card instanceof ExhaustionCard && currentPlayer.removeCard(card))
		currentPlayer.discardCards()
		return valueOfHandCards
	}

	private async buenosAiresStepThree(currentPlayer: Player, valueOfDelivery: number) {
		console.log("Handling Buenos Aires step 3")
		const chosenShipOption = (await currentPlayer.chooseOption(
			new ShipOptions(valueOfDelivery).resolve(this.gameBoard, currentPlayer),
		)) as ShipOption
		const chosenUpgrade = await currentPlayer.chooseOption(
			new UpgradeOptions(chosenShipOption.ship.tokenColor).resolve(this.gameBoard, currentPlayer),
		)
		chosenUpgrade.resolve(this.gameBoard, currentPlayer)
	}

	private async buenosAiresStepFour(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 4")
		const options = new TileOptions(this.gameBoard.foresightSpacesA).resolve(this.gameBoard, currentPlayer)
		const chosenOption = (await currentPlayer.chooseOption(options)) as TileOption
		this.handleWorkerEvents(chosenOption)
		chosenOption.resolve(this.gameBoard, currentPlayer)
	}

	private async buenosAiresStepFive(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 5")
		const options = new TileOptions(this.gameBoard.foresightSpacesB).resolve(this.gameBoard, currentPlayer)
		const chosenOption = (await currentPlayer.chooseOption(options)) as TileOption
		this.handleWorkerEvents(chosenOption)
		chosenOption.resolve(this.gameBoard, currentPlayer)
	}

	private async buenosAiresStepSix(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 6")
		const options = new TileOptions(this.gameBoard.foresightSpacesC).resolve(this.gameBoard, currentPlayer)
		const chosenOption = (await currentPlayer.chooseOption(options)) as TileOption
		this.handleWorkerEvents(chosenOption)
		chosenOption.resolve(this.gameBoard, currentPlayer)
	}

	private handleWorkerEvents(chosenOption: TileOption) {
		if (!chosenOption.isWorker()) {
			return
		}

		switch (this.gameBoard.jobMarket.length) {
			case 5 * this.gameBoard.players.length - 1:
				this.sailShipsOfColor(ShipColor.YELLOW)
				this.gameBoard.refillShips()
				break
			case 6 * this.gameBoard.players.length - 1:
				this.gameBoard.refillCowMarket()
				break
			case 7 * this.gameBoard.players.length - 1:
				this.sailShipsOfColor(ShipColor.TURQUOISE)
				this.gameBoard.refillShips()
				break
			case 8 * this.gameBoard.players.length - 1:
				this.gameBoard.refillCowMarket()
				break
			case 9 * this.gameBoard.players.length - 1:
				this.sailShipsOfColor(ShipColor.YELLOW)
				this.gameBoard.refillShips()
				break
		}
	}

	private sailShipsOfColor(color: ShipColor) {
		this.gameBoard.availableShips
			.filter((ship) => ship.color === color)
			.forEach((ship) => ship.players.forEach((player) => ship.destinationPort?.push(player)))
		this.gameBoard.availableShips = this.gameBoard.availableShips.filter((ship) => ship.color !== color)
	}
}
