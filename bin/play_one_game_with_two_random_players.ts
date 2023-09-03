import Engine from "../src/engine.js"
import Player from "../src/player.js"
import RandomPlayer from "../src/randomPlayer.js"

const one = new RandomPlayer("Random One")
const two = new RandomPlayer("Random Two")
const players: Player[] = [one, two]
const engine = new Engine(players)

const gameBoard = await engine.play()

console.log({
	nextPlayer: engine.nextPlayer(),
	jobMarket: gameBoard.jobMarket,
	cowMarket: gameBoard.cowMarket,
	one,
	two,
	railRoadTrack: gameBoard.railroadTrackWithoutStationMasterSpaces,
})
