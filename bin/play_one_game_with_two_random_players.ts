import Engine from "../src/engine.js"
import Player from "../src/player.js"
import RandomPlayer from "../src/randomPlayer.js"
import GameBoard from "../src/gameBoard.js"
import SlightlySmarterRandomPlayer from "../src/slightlySmarterRandomPlayer.js"

const one = new RandomPlayer("Random One")
const two = new SlightlySmarterRandomPlayer("Slightly Smarter Random Two")
const players: Player[] = [one, two]
const gameBoard = new GameBoard(players)
const engine = new Engine(gameBoard)

await engine.play()

console.log({
	score: gameBoard.endgameScoring(),
})

console.log({
	name: one.name,
	coins: one.coins,
	grain: one.grain,
	exchangeTokens: one.exchangeTokens,
	herders: one.herders.length,
	carpenters: one.carpenters.length,
	machinists: one.machinists.length,
	farmers: one.farmers.length,
	helpedFarmers: one.helpedFarmers.length,
	playedObjectives: one.playedObjectives.length,
})

console.log({
	name: two.name,
	coins: two.coins,
	grain: two.grain,
	exchangeTokens: two.exchangeTokens,
	herders: two.herders.length,
	carpenters: two.carpenters.length,
	machinists: two.machinists.length,
	farmers: two.farmers.length,
	helpedFarmers: two.helpedFarmers.length,
	playedObjectives: two.playedObjectives.length,
})

console.log({
	roundsPlayed: one.turnsTaken(),
	foresightA: gameBoard.foresightSpacesA.join(","),
	foresightB: gameBoard.foresightSpacesB.join(","),
	foresightC: gameBoard.foresightSpacesC.join(","),
	aTiles: gameBoard.aTiles.length,
	bTiles: gameBoard.bTiles.length,
	cTiles: gameBoard.cTiles.length,
	jobMarket: gameBoard.jobMarket.join(","),
})
