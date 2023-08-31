import GameBoard from "./gameBoard.js"

test("At the start of a game, all available building locations are detected", () => {
	const gameBoard = new GameBoard()
	expect(gameBoard.emptyBuildingLocations()).toHaveLength(22)
})
