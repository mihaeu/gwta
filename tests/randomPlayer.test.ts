import RandomPlayer from "../src/randomPlayer.js"
import { Carpenter, Herder, Machinist } from "../src/tiles.js"
import { beforeEach, describe, it } from "bun:test"
import { equal, fail, ok } from "node:assert/strict"
import Player, { UpgradeType } from "../src/player.js"

describe("Random Player", () => {
	let testPlayer: Player

	describe("workers", () => {
		beforeEach(() => {
			testPlayer = new RandomPlayer("Test")
		})

		it("should assign worker to correct work type", () => {
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

	describe("grain", () => {
		beforeEach(() => {
			testPlayer = new RandomPlayer("Test")
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

	describe("certificates", () => {
		beforeEach(() => {
			testPlayer = new RandomPlayer("Test")
		})

		it("should not be able to go higher than 4", () => {
			equal(testPlayer.certificates, 0)
			testPlayer.certificates += 10
			equal(testPlayer.certificates, 4)
		})

		it("should not be able to go lower than 0", () => {
			equal(testPlayer.certificates, 0)
			testPlayer.certificates = 3
			equal(testPlayer.certificates, 3)
			testPlayer.certificates -= 10
			equal(testPlayer.certificates, 0)
		})
	})

	describe("strength", () => {
		beforeEach(() => {
			testPlayer = new RandomPlayer("Test")
		})

		it("should add strength from all workers", () => {
			testPlayer.hireWorker(new Carpenter(true))
			testPlayer.hireWorker(new Carpenter(true))
			testPlayer.hireWorker(new Machinist(true))
			testPlayer.hireWorker(new Machinist(true))
			testPlayer.hireWorker(new Herder(true))
			testPlayer.hireWorker(new Herder(true))
			equal(testPlayer.strength(), 6)
		})

		it("should have 3 base strength with fully upgraded player board", () => {
			testPlayer.upgrades.strengthUpgradeOne = UpgradeType.UPGRADED
			testPlayer.upgrades.strengthUpgradeTwo = UpgradeType.UPGRADED
			equal(testPlayer.strength(), 3)
		})
	})
})
