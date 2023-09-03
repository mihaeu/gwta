import Player from "./player.js"
import GameBoard from "./gameBoard.js"
import { BuenosAiresNode, BuildingNode, FarmerNode } from "./nodes.js"
import { BlueFarmer, EmptyJobMarketSlot, GreenFarmer, JobMarketToken, OrangeFarmer, YellowFarmer } from "./tiles.js"
import { Card, CowCard } from "./cards.js"
import { Option } from "./options/option.js"
import { MoveOptions } from "./actions/moveOptions.js"

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

	private buenosAiresStepFive(currentPlayer: Player) {
		console.log("Handling Buenos Aires step 5")
		const chosenBIndex = currentPlayer.chooseForesightTileB(this.gameBoard.foresightSpacesB)
		const chosenBTile = this.gameBoard.foresightSpacesB[chosenBIndex]
		console.log(`Chose ${chosenBIndex} - `, chosenBTile, ` from `, this.gameBoard.foresightSpacesB)

		const lastItem = this.gameBoard.jobMarket.length - 1
		if (this.gameBoard.jobMarket.some((slot) => slot instanceof EmptyJobMarketSlot)) {
			for (let index = Math.floor(lastItem / 2); index < lastItem; ++index) {
				if (this.gameBoard.jobMarket[index] instanceof EmptyJobMarketSlot) {
					this.gameBoard.jobMarket[index] = chosenBTile
					break
				}
			}
		} else {
			this.gameBoard.jobMarket[lastItem] = chosenBTile
			this.gameBoard.jobMarket = this.gameBoard.jobMarket.concat(
				[...new Array(this.players.length - 1).fill(new EmptyJobMarketSlot())],
				new JobMarketToken(),
			)
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
			const lastItem = this.gameBoard.jobMarket.length - 1
			if (this.gameBoard.jobMarket.some((slot) => slot instanceof EmptyJobMarketSlot)) {
				for (let index = Math.floor(lastItem / 2); index < lastItem; ++index) {
					if (this.gameBoard.jobMarket[index] instanceof EmptyJobMarketSlot) {
						this.gameBoard.jobMarket[index] = chosenCTile
						break
					}
				}
			} else {
				this.gameBoard.jobMarket[lastItem] = chosenCTile
				this.gameBoard.jobMarket = this.gameBoard.jobMarket.concat(
					[...new Array(this.players.length - 1).fill(new EmptyJobMarketSlot())],
					new JobMarketToken(),
				)
			}
		}
		this.gameBoard.foresightSpacesC[chosenCIndex] = this.gameBoard.cTiles.splice(0, 1)[0]
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
