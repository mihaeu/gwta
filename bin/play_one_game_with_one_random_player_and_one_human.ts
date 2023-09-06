import Engine from "../src/engine.js"
import GameBoard from "../src/gameBoard.js"
import Player from "../src/player.js"
import RandomPlayer from "../src/randomPlayer.js"
import CommandLinePlayer from "../src/commandLinePlayer.js"

const one = new CommandLinePlayer("Human", GameBoard.START)
const two = new RandomPlayer("Random")
const players: Player[] = [one, two]
const engine = new Engine(players)

const gameBoard = await engine.play()

console.log({
	nextPlayer: gameBoard.nextPlayer(),
	jobMarket: gameBoard.jobMarket,
	cowMarket: gameBoard.cowMarket,
	one,
	two,
	railRoadTrack: gameBoard.railroadTrackWithoutStationMasterSpaces,
})
