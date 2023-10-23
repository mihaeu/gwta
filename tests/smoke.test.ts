import { describe, expect, it } from "bun:test"
import RandomPlayer from "../src/randomPlayer.js"
import SlightlySmarterRandomPlayer from "../src/slightlySmarterRandomPlayer.js"
import Player from "../src/player.js"
import GameBoard from "../src/gameBoard.js"
import Engine from "../src/engine.js"

describe("Smoke Test", () => {
	it.skip("should not crash when randomly playing a few times", async () => {
		for (let i = 0; i < 20; ++i) {
			const one = new RandomPlayer("Random One")
			const two = new SlightlySmarterRandomPlayer("Slightly Smarter Random Two")
			const players: Player[] = [one, two]
			const gameBoard = new GameBoard(players)
			const engine = new Engine(gameBoard)

			await engine.play()

			expect(gameBoard.endgameScoring()).not.toBeEmpty()
		}
	})
})
