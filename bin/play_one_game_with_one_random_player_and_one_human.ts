import Engine from "../src/engine.js"
import GameBoard from "../src/gameBoard.js"
import Player from "../src/player.js"
import RandomPlayer from "../src/randomPlayer.js"
import CommandLinePlayer from "../src/commandLinePlayer.js"

const one = new RandomPlayer("Random")
const two = new CommandLinePlayer("Human", GameBoard.START)
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
