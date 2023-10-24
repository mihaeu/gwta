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
import { JobMarketToken } from "./tiles.js"
import { CertificateOptions } from "./actions/certificateOptions.js"
import { CertificateOption } from "./options/certificateOption.js"
import { UseExchangeTokenOption } from "./options/useExchangeTokenOption.js"
import { PlayObjectiveCardOptions } from "./actions/playObjectiveCardOptions.js"
import { PlayObjectiveCardOption } from "./options/playObjectiveCardOption.js"

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

	private async chooseOption(currentPlayer: Player, options: Option[]): Promise<Option> {
		while (currentPlayer.exchangeTokens > 0) {
			const chosenOption = await currentPlayer.chooseOption([...options, new UseExchangeTokenOption()])
			if (chosenOption instanceof UseExchangeTokenOption) {
				const discardOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
				const chosenDiscardOption = await this.chooseOption(currentPlayer, discardOptions)
				chosenDiscardOption.resolve(this.gameBoard, currentPlayer)
			} else {
				return chosenOption
			}
		}
		return await currentPlayer.chooseOption(options)
	}

	private async firstRound() {
		for (const currentPlayer of this.gameBoard.players) {
			const options = this.gameBoard.neutralBuildings.map((neutralBuildingLocation) => new MoveOption(neutralBuildingLocation))
			const chosenOption = await this.chooseOption(currentPlayer, options)
			chosenOption.resolve(this.gameBoard, currentPlayer)
			await this.discardExcessCards(currentPlayer, Player.STARTING_CARD_LIMIT)
			await this.phaseB(currentPlayer)
			await this.phaseC(currentPlayer)
		}
	}

	isGameOver(): boolean {
		return this.gameBoard.jobMarket.length >= this.gameBoard.players.length * 11 + 1 && this.allPlayersTookSameAmountOfTurns()
	}

	async phaseA(currentPlayer: Player) {
		const previousLocation = currentPlayer.location
		console.info(`Player ${currentPlayer.name} is on ${previousLocation.constructor.name} and takes a turn.`)
		let chosenOption
		while (!(chosenOption instanceof MoveOption)) {
			chosenOption = await this.chooseOption(
				currentPlayer,
				new MoveOptions()
					.resolve(this.gameBoard, currentPlayer)
					.concat(new PlayObjectiveCardOptions().resolve(this.gameBoard, currentPlayer)),
			)
			const subOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
			if (subOptions.length > 0) {
				await this.chooseOption(currentPlayer, subOptions)
			}
		}
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
			const chosenOption = await this.chooseOption(currentPlayer, initialPhaseBOptions)
			if (chosenOption instanceof AuxiliaryActionOptions) {
				let chosenAuxiliaryActionOption
				let subOptions: Option[] = []
				while (chosenAuxiliaryActionOption instanceof PlayObjectiveCardOption || chosenAuxiliaryActionOption === undefined) {
					chosenAuxiliaryActionOption = await this.chooseOption(
						currentPlayer,
						chosenOption
							.resolve(this.gameBoard, currentPlayer)
							.concat(new PlayObjectiveCardOptions().resolve(this.gameBoard, currentPlayer)),
					)
					subOptions = chosenAuxiliaryActionOption.resolve(this.gameBoard, currentPlayer)
					while (subOptions.length > 0) {
						const chosenSubOption = await this.chooseOption(currentPlayer, subOptions)
						subOptions = chosenSubOption.resolve(this.gameBoard, currentPlayer)
					}
				}

				let objectiveCardOptions = new PlayObjectiveCardOptions().resolve(this.gameBoard, currentPlayer)
				while (objectiveCardOptions.length > 0) {
					if (!objectiveCardOptions.some((option) => option instanceof PassOption)) {
						objectiveCardOptions.push(new PassOption())
					}
					const objectiveCardOption = await this.chooseOption(currentPlayer, objectiveCardOptions)
					objectiveCardOption.resolve(this.gameBoard, currentPlayer)
					objectiveCardOptions = new PlayObjectiveCardOptions().resolve(this.gameBoard, currentPlayer)
				}
			}
			if (chosenOption instanceof LocationOptions) {
				let locationOptions = chosenOption
					.resolve(this.gameBoard, currentPlayer)
					.concat(new PlayObjectiveCardOptions().resolve(this.gameBoard, currentPlayer))
				const takenOptions: Option[] = []
				while (locationOptions.length > 0) {
					let chosenLocationOption = await this.chooseOption(currentPlayer, locationOptions)
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
						const chosenSubOption = await this.chooseOption(currentPlayer, subOptions)
						subOptions = chosenSubOption.resolve(this.gameBoard, currentPlayer)
					}
					locationOptions = chosenOption
						.resolve(this.gameBoard, currentPlayer)
						.filter((option) => !takenOptions.some((takenOption) => takenOption.toString() === option.toString()))
						.concat(new PlayObjectiveCardOptions().resolve(this.gameBoard, currentPlayer))
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
		const chosenOption = await this.chooseOption(currentPlayer, availableOptions)
		chosenOption.resolve(this.gameBoard, currentPlayer)
	}

	private async buenosAiresStepOne(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 1")
		const options: Option[] = new BuenosAiresStepOneOptions().resolve(this.gameBoard, currentPlayer)
		if (options.length === 0) {
			return
		}

		const chosenOption = await this.chooseOption(currentPlayer, options)
		let subOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
		while (subOptions.length > 0) {
			const chosenOption = await this.chooseOption(currentPlayer, subOptions)
			subOptions = chosenOption.resolve(this.gameBoard, currentPlayer)
		}
	}

	private async buenosAiresStepTwo(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 2")
		let valueOfHandCards = this.determineValueOfHandCards(currentPlayer)

		if (currentPlayer.certificates > 0) {
			const certificateOptions = new CertificateOptions().resolve(this.gameBoard, currentPlayer)
			const certificateOption = (await this.chooseOption(currentPlayer, certificateOptions)) as CertificateOption
			certificateOption.resolve(this.gameBoard, currentPlayer)
			valueOfHandCards += Math.abs(certificateOption.count)
		}

		currentPlayer.gainCoins(valueOfHandCards)
		console.log(`Sold cows for ${valueOfHandCards} coins.`)
		currentPlayer.handCards.forEach((card) => card instanceof ExhaustionCard && currentPlayer.removeCard(card))
		currentPlayer.discardCards()
		return valueOfHandCards
	}

	private async buenosAiresStepThree(currentPlayer: Player, valueOfDelivery: number) {
		console.log("Handling Buenos Aires step 3")
		const chosenShipOption = (await this.chooseOption(
			currentPlayer,
			new ShipOptions(valueOfDelivery).resolve(this.gameBoard, currentPlayer),
		)) as ShipOption
		chosenShipOption.resolve(this.gameBoard, currentPlayer)
		const chosenUpgrade = await this.chooseOption(
			currentPlayer,
			new UpgradeOptions(chosenShipOption.ship.tokenColor).resolve(this.gameBoard, currentPlayer),
		)
		chosenUpgrade.resolve(this.gameBoard, currentPlayer)
	}

	private async buenosAiresStepFour(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 4")
		const options = new TileOptions(this.gameBoard.foresightSpacesA, this.isGameOver()).resolve(this.gameBoard, currentPlayer)
		if (options.length === 0) {
			return
		}
		const chosenOption = (options.length === 1 ? options[0] : await this.chooseOption(currentPlayer, options)) as TileOption
		this.handleWorkerEvents(chosenOption, currentPlayer)
		chosenOption.resolve(this.gameBoard, currentPlayer)
	}

	private async buenosAiresStepFive(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 5")
		const options = new TileOptions(this.gameBoard.foresightSpacesB, this.isGameOver()).resolve(this.gameBoard, currentPlayer)
		if (options.length === 0) {
			return
		}
		const chosenOption = (options.length === 1 ? options[0] : await this.chooseOption(currentPlayer, options)) as TileOption
		this.handleWorkerEvents(chosenOption, currentPlayer)
		chosenOption.resolve(this.gameBoard, currentPlayer)
	}

	private async buenosAiresStepSix(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 6")
		const options = new TileOptions(this.gameBoard.foresightSpacesC, this.isGameOver()).resolve(this.gameBoard, currentPlayer)
		if (options.length === 0) {
			return
		}
		const chosenOption = (options.length === 1 ? options[0] : await this.chooseOption(currentPlayer, options)) as TileOption
		this.handleWorkerEvents(chosenOption, currentPlayer)
		chosenOption.resolve(this.gameBoard, currentPlayer)
	}

	private handleWorkerEvents(chosenOption: TileOption, currentPlayer: Player) {
		if (chosenOption.isFarmer()) {
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
			case this.gameBoard.players.length * 11:
				if (!this.gameBoard.players.some((player) => player.jobMarketToken instanceof JobMarketToken)) {
					currentPlayer.jobMarketToken = new JobMarketToken()
				}
				break
		}
	}

	private sailShipsOfColor(color: ShipColor) {
		this.gameBoard.availableShips
			.filter((ship) => ship.color === color)
			.forEach((ship) => ship.players.forEach((player) => ship.destinationPort?.push(player)))
		this.gameBoard.availableShips = this.gameBoard.availableShips.filter((ship) => ship.color !== color)
	}

	private allPlayersTookSameAmountOfTurns() {
		for (let i = 1; i < this.gameBoard.players.length; ++i) {
			if (this.gameBoard.players[i].turnsTaken() !== this.gameBoard.players[0].turnsTaken()) {
				return false
			}
		}
		return true
	}
}
