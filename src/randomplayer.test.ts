import RandomPlayer from "./randomplayer.js"
import { Start } from "./nodes.js"
import { Carpenter } from "./tiles.js"
import { it } from "node:test"
import { equal } from "node:assert/strict"

it("Ensure worker is removed from job market and added to player board", () => {
	const testPlayer = new RandomPlayer("Test", new Start(), [], [])
	equal(testPlayer.carpenters.length, 1)
	testPlayer.hireWorker(new Carpenter())
	equal(testPlayer.carpenters.length, 2)
})
