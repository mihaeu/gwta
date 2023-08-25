import Engine from "./engine.js"
import Map from "./map.js"
import Player from "./player.js"
import RandomPlayer from "./randomplayer.js"

const map = new Map()
const one = new RandomPlayer("One", map.start)
const two = new RandomPlayer("Two", map.start)
const players: Player[] = [one, two]
const engine = new Engine(map, players)

while (!engine.isGameOver()) {
	const currentPlayer = engine.nextPlayer()
	engine.phaseA(currentPlayer)
	engine.phaseB(currentPlayer)
	engine.phaseC(currentPlayer)
}
console.log("Game is over", engine.isGameOver())

// console.log({
// 	nextPlayer: engine.nextPlayer(),
// 	nextReachableNodes: map.start.childNodes().pop()!.nextNonEmptyDescendants(),
// 	greenFarmers: map.greenFarmers,
// 	blueFarmers: map.blueFarmers,
// 	orangeFarmers: map.orangeFarmers,
// 	yellowFarmers: map.yellowFarmers,
// 	jobMarket: map.jobMarket,
// 	foresightSpacesA: map.foresightSpacesA,
// 	foresightSpacesB: map.foresightSpacesB,
// 	foresightSpacesC: map.foresightSpacesC,
// })
