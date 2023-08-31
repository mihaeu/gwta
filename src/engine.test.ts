import GameBoard from "./gameBoard.js"
import Engine from "./engine.js"
import RandomPlayer from "./randomplayer.js"

test("At the start of a game, all available building locations are detected", () => {
	const gameBoard = new GameBoard()
	const testPlayer = new RandomPlayer("Test", gameBoard.start, [], [])
	const players = [testPlayer]
	const engine = new Engine(gameBoard, players)
	expect(engine.nextPlayer()).toEqual(testPlayer)
})
