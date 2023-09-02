import RandomPlayer from "./randomplayer.js"
import { Start } from "./nodes.js"
import { Carpenter, Herder, Machinist } from "./tiles.js"
import { beforeEach, describe, it } from "node:test"
import { equal, fail, ok } from "node:assert/strict"
import Player from "./player.js"

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

	describe("grain", () => {
		let testPlayer: Player

		beforeEach(() => {
			testPlayer = new RandomPlayer("Test", new Start(), [], [])
		})

		it("should start with 0 grain", () => {
			equal(testPlayer.grain, 0)
		})

		it("should be able to pay existing grain", () => {
			testPlayer.gainGrain(5)
			testPlayer.useGrain(3)
			equal(testPlayer.grain, 2)
		})

		it("should not be able to have more than 8 grain", () => {
			testPlayer.gainGrain(9999)
			equal(testPlayer.grain, 8)
		})

		it("should not be able to pay more grain than available", () => {
			try {
				testPlayer.useGrain(1)
				fail()
			} catch (e) {
				ok(e)
			}
		})
	})
})
