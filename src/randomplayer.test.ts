import RandomPlayer from "./randomplayer.js"
import { Start } from "./nodes.js"
import { Carpenter, Herder, Machinist } from "./tiles.js"
import { describe, it } from "node:test"
import { equal } from "node:assert/strict"

describe("Random Player", () => {
	it("should assign worker to correct work type", () => {
		const testPlayer = new RandomPlayer("Test", new Start(), [], [])
		equal(testPlayer.carpenters.length, 1)
		testPlayer.hireWorker(new Carpenter())
		equal(testPlayer.carpenters.length, 2)

		equal(testPlayer.machinists.length, 1)
		testPlayer.hireWorker(new Machinist())
		equal(testPlayer.machinists.length, 2)

		equal(testPlayer.herders.length, 1)
		testPlayer.hireWorker(new Herder())
		equal(testPlayer.herders.length, 2)
	})
})
