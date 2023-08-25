import Engine from "./engine.js"
import Map from "./map.js"
import Player from "./player.js"

const map = new Map()
const one = new Player("One", map.start)
const two = new Player("Two", map.start)
const players: Player[] = [one, two]
const engine = new Engine(map, players)

while (!engine.isGameOver()) {
	const currentPlayer = engine.nextPlayer()
	const previousLocation = currentPlayer.location
	console.info(
		`Player ${currentPlayer.name} is on ${previousLocation.constructor.name} and takes a turn`,
	)
	const nextLocation = currentPlayer.location.nextNonEmptyDescendants()[0]
	if (nextLocation === undefined) {
		throw new Error(
			`No reachable location found for player ${currentPlayer.name}.`,
		)
	}
	currentPlayer.location = nextLocation
	console.info(
		`Player ${currentPlayer.name} moved from ${previousLocation.constructor.name} to ${nextLocation.constructor.name}.`,
	)
	currentPlayer.nextTurn()
	console.info(
		`Player ${currentPlayer.name} turns taken ${currentPlayer.turnsTaken()}`,
	)
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
