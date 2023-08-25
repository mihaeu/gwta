import Engine from "./engine.js"
import Map from "./map.js"
import Player from "./player.js"

const map = new Map()
const one = new Player("One")
const two = new Player("Two")
const players: Player[] = [one, two]
const engine = new Engine(map, players)

while (!engine.isGameOver()) {
	const currentPlayer = engine.nextPlayer()
	console.info("Player takes a turn", currentPlayer)
	currentPlayer.nextTurn()
	console.info("Turns taken", currentPlayer.turnsTaken())
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
// 	foresightSpace: map.foresightSpaces,
// })
