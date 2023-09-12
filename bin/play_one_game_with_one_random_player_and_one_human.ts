import GameBoard from "../src/gameBoard.js"
import Player from "../src/player.js"
import RandomPlayer from "../src/randomPlayer.js"
import CommandLinePlayer from "../src/commandLinePlayer.js"

const one = new CommandLinePlayer("Human")
const two = new RandomPlayer("Random")
const players: Player[] = [one, two]
const gameBoard = new GameBoard(players)
// const engine = new Engine(gameBoard)

// await engine.play()

console.log({
	score: gameBoard.endgameScoring(),
})
process.exit(0)
