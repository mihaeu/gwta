import { Option } from "./option.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"

export class MoveTrainOption extends Option {
	constructor(private readonly distance: number) {
		super()
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const previousTrainLocation = gameBoard.railroadTrackWithoutStationMasterSpaces.findIndex(
			(players) => players !== undefined && players.find((player) => player.name === currentPlayer.name),
		)

		// remove player from current location
		gameBoard.railroadTrackWithoutStationMasterSpaces[previousTrainLocation] = gameBoard.railroadTrackWithoutStationMasterSpaces[
			previousTrainLocation
		].filter((player) => player.name !== currentPlayer.name)

		// advance train
		const steps = this.distance + this.occupiedStepsInBetween(gameBoard, previousTrainLocation, this.distance)
		gameBoard.railroadTrackWithoutStationMasterSpaces[previousTrainLocation + steps] = [currentPlayer]

		return []
	}

	private occupiedStepsInBetween(gameBoard: GameBoard, trainLocation: number, distance: number) {
		let occupiedStepsInBetween = 0
		for (let i = 1; i <= distance; ++i) {
			const spaceToCheck = trainLocation + i + occupiedStepsInBetween
			if (
				gameBoard.railroadTrackWithoutStationMasterSpaces[spaceToCheck] &&
				gameBoard.railroadTrackWithoutStationMasterSpaces[spaceToCheck].length > 0
			) {
				++occupiedStepsInBetween
			}
		}
		return occupiedStepsInBetween
	}

	toString(): string {
		return `${super.toString()}(${this.distance})`
	}
}
