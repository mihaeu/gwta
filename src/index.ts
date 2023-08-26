import Engine from "./engine.js"
import Map from "./map.js"
import Player from "./player.js"
import RandomPlayer from "./randomplayer.js"
import { CowCard, Fronterizo, HolandoArgentino, Niata, Patagonico } from "./cards.js"
import arrayShuffle from "array-shuffle"

const map = new Map()
const startCards = new Array<CowCard>(5)
	.fill(new Niata(1, 1, 0))
	.concat(new Array<CowCard>(3).fill(new Patagonico(2, 2, 0)))
	.concat(new Array<CowCard>(3).fill(new Fronterizo(2, 2, 0)))
	.concat(new Array<CowCard>(3).fill(new HolandoArgentino(2, 2, 0)))
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
