import Engine from "./engine.js"
import GameBoard from "./gameBoard.js"
import Player from "./player.js"
import RandomPlayer from "./randomplayer.js"
import { Fronterizo, HolandoArgentino, Niata, Patagonico } from "./cards.js"
import arrayShuffle from "array-shuffle"
import {
	PlayerBuilding,
	PlayerBuilding10A,
	PlayerBuilding10B,
	PlayerBuilding1A,
	PlayerBuilding1B,
	PlayerBuilding2A,
	PlayerBuilding2B,
	PlayerBuilding3A,
	PlayerBuilding3B,
	PlayerBuilding4A,
	PlayerBuilding4B,
	PlayerBuilding5A,
	PlayerBuilding5B,
	PlayerBuilding6A,
	PlayerBuilding6B,
	PlayerBuilding7A,
	PlayerBuilding7B,
	PlayerBuilding8A,
	PlayerBuilding8B,
	PlayerBuilding9A,
	PlayerBuilding9B,
} from "./buildings/buildings.js"

const map = new GameBoard()
const startCards = [
	new Niata(),
	new Niata(),
	new Niata(),
	new Niata(),
	new Niata(),
	new Patagonico(),
	new Patagonico(),
	new Patagonico(),
	new Fronterizo(),
	new Fronterizo(),
	new Fronterizo(),
	new HolandoArgentino(),
	new HolandoArgentino(),
	new HolandoArgentino(),
]
const playerBuildings = [
	[new PlayerBuilding1A(), new PlayerBuilding1B()],
	[new PlayerBuilding2A(), new PlayerBuilding2B()],
	[new PlayerBuilding3A(), new PlayerBuilding3B()],
	[new PlayerBuilding4A(), new PlayerBuilding4B()],
	[new PlayerBuilding5A(), new PlayerBuilding5B()],
	[new PlayerBuilding6A(), new PlayerBuilding6B()],
	[new PlayerBuilding7A(), new PlayerBuilding7B()],
	[new PlayerBuilding8A(), new PlayerBuilding8B()],
	[new PlayerBuilding9A(), new PlayerBuilding9B()],
	[new PlayerBuilding10A(), new PlayerBuilding10B()],
].map((playerBuildings: PlayerBuilding[]) => playerBuildings[Math.round(Math.random())])
const one = new RandomPlayer("One", map.start, arrayShuffle(startCards), [...playerBuildings])
const two = new RandomPlayer("Two", map.start, arrayShuffle(startCards), [...playerBuildings])
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
