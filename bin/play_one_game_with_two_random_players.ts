import Engine from "../src/engine.js"
import Player from "../src/player.js"
import RandomPlayer from "../src/randomPlayer.js"
import GameBoard from "../src/gameBoard.js"

const one = new RandomPlayer("Random One")
const two = new RandomPlayer("Random Two")
const players: Player[] = [one, two]
const gameBoard = new GameBoard(players)
const engine = new Engine(gameBoard)

await engine.play()

console.log({
	score: gameBoard.endgameScoring(),
})
