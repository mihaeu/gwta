import Player from "./player.js"
import Map from "./map.js"

export default class Engine {
	private map: Map
	private players: Player[]

	constructor(map: Map, players: Player[]) {
		this.map = map
		this.players = players

		players.forEach((player) => player.setLocation(map.start))
	}

	nextPlayer(): Player {
		return this.players.reduce((previousPlayer, currentPlayer) =>
			previousPlayer.turnsTaken() > currentPlayer.turnsTaken()
				? currentPlayer
				: previousPlayer,
		)
	}

	moves(): number[] {
		return []
	}

	isGameOver(): boolean {
		return this.players[this.players.length - 1].turnsTaken() >= 20
	}
}
