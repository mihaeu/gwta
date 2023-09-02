import Engine from "./engine.js"
import GameBoard from "./gameBoard.js"
import Player from "./player.js"
import RandomPlayer from "./randomplayer.js"
import { Fronterizo, HolandoArgentino, Niata, Patagonico } from "./cards.js"
import arrayShuffle from "array-shuffle"
import { PlayerBuilding1A } from "./buildings/playerBuilding1A.js"
import { PlayerBuilding1B } from "./buildings/playerBuilding1B.js"
import { PlayerBuilding2A } from "./buildings/playerBuilding2A.js"
import { PlayerBuilding3A } from "./buildings/playerBuilding3A.js"
import { PlayerBuilding4A } from "./buildings/playerBuilding4A.js"
import { PlayerBuilding5A } from "./buildings/playerBuilding5A.js"
import { PlayerBuilding6A } from "./buildings/playerBuilding6A.js"
import { PlayerBuilding7A } from "./buildings/playerBuilding7A.js"
import { PlayerBuilding8A } from "./buildings/playerBuilding8A.js"
import { PlayerBuilding9A } from "./buildings/playerBuilding9A.js"
import { PlayerBuilding10A } from "./buildings/playerBuilding10A.js"
import { PlayerBuilding2B } from "./buildings/playerBuilding2B.js"
import { PlayerBuilding3B } from "./buildings/playerBuilding3B.js"
import { PlayerBuilding4B } from "./buildings/playerBuilding4B.js"
import { PlayerBuilding5B } from "./buildings/playerBuilding5B.js"
import { PlayerBuilding6B } from "./buildings/playerBuilding6B.js"
import { PlayerBuilding7B } from "./buildings/playerBuilding7B.js"
import { PlayerBuilding8B } from "./buildings/playerBuilding8B.js"
import { PlayerBuilding9B } from "./buildings/playerBuilding9B.js"
import { PlayerBuilding10B } from "./buildings/playerBuilding10B.js"
import { PlayerBuilding } from "./buildings/playerBuilding.js"

const gameBoard = new GameBoard()
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
const one = new RandomPlayer("One", GameBoard.START, arrayShuffle(startCards), [...playerBuildings])
const two = new RandomPlayer("Two", GameBoard.START, arrayShuffle(startCards), [...playerBuildings])
const players: Player[] = [one, two]
const engine = new Engine(gameBoard, players)

while (!engine.isGameOver()) {
	const currentPlayer = engine.nextPlayer()
	engine.phaseA(currentPlayer)
	engine.phaseB(currentPlayer)
	engine.phaseC(currentPlayer)
}
console.log("Game is over", engine.isGameOver())

console.log({
	nextPlayer: engine.nextPlayer(),
	greenFarmers: gameBoard.greenFarmers,
	blueFarmers: gameBoard.blueFarmers,
	orangeFarmers: gameBoard.orangeFarmers,
	yellowFarmers: gameBoard.yellowFarmers,
	jobMarket: gameBoard.jobMarket,
	foresightSpacesA: gameBoard.foresightSpacesA,
	foresightSpacesB: gameBoard.foresightSpacesB,
	foresightSpacesC: gameBoard.foresightSpacesC,
	one,
	two,
	railRoadTrack: gameBoard.railroadTrackWithoutStationMasterSpaces,
})
