import GameBoard from "../src/gameBoard.js"
import Player from "../src/player.js"
import RandomPlayer from "../src/randomPlayer.js"
import CommandLinePlayer from "../src/commandLinePlayer.js"
import Engine from "../src/engine.js"

const one = new RandomPlayer("Random")
const two = new CommandLinePlayer("Human")
const players: Player[] = [one, two]
const gameBoard = new GameBoard(players)
const engine = new Engine(gameBoard)

await engine.play()

console.log({
	score: gameBoard.endgameScoring(),
})
process.exit(0)
