import Engine from "./engine.js"
import GameBoard from "./gameBoard.js"
import Player from "./player.js"
import RandomPlayer from "./randomplayer.js"
import { CowCard, Fronterizo, HolandoArgentino, Niata, Patagonico } from "./cards.js"
import arrayShuffle from "array-shuffle"

const map = new GameBoard()
const startCards = new Array<CowCard>(Niata.COUNT)
	.fill(new Niata())
	.concat(new Array<CowCard>(Patagonico.COUNT).fill(new Patagonico()))
	.concat(new Array<CowCard>(Fronterizo.COUNT).fill(new Fronterizo()))
	.concat(new Array<CowCard>(HolandoArgentino.COUNT).fill(new HolandoArgentino()))
const one = new RandomPlayer("One", map.start, arrayShuffle(startCards))
const two = new RandomPlayer("Two", map.start, arrayShuffle(startCards))
const players: Player[] = [one, two]
const engine = new Engine(map, players)

while (!engine.isGameOver()) {
	const currentPlayer = engine.nextPlayer()
	engine.phaseA(currentPlayer)
	engine.phaseB(currentPlayer)
	engine.phaseC(currentPlayer)
}
console.log("Game is over", engine.isGameOver())

console.log({
	nextPlayer: engine.nextPlayer(),
	greenFarmers: map.greenFarmers,
	blueFarmers: map.blueFarmers,
	orangeFarmers: map.orangeFarmers,
	yellowFarmers: map.yellowFarmers,
	jobMarket: map.jobMarket,
	foresightSpacesA: map.foresightSpacesA,
	foresightSpacesB: map.foresightSpacesB,
	foresightSpacesC: map.foresightSpacesC,
	one,
	two,
})
