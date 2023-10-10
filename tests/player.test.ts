import RandomPlayer from "../src/randomPlayer.js"
import { Carpenter, Herder, Machinist } from "../src/tiles.js"
import { beforeEach, describe, expect, it } from "bun:test"
import Player, { UpgradeType } from "../src/player.js"

describe("Player", () => {
	let testPlayer: Player

	describe("workers", () => {
		beforeEach(() => {
			testPlayer = new RandomPlayer("Test")
		})

		it("should assign worker to correct work type", () => {
			expect(testPlayer.carpenters).toHaveLength(1)
			testPlayer.hireWorker(new Carpenter())
			expect(testPlayer.carpenters).toHaveLength(2)

			expect(testPlayer.machinists).toHaveLength(1)
			testPlayer.hireWorker(new Machinist())
			expect(testPlayer.machinists).toHaveLength(2)

			expect(testPlayer.herders).toHaveLength(1)
			testPlayer.hireWorker(new Herder())
			expect(testPlayer.herders).toHaveLength(2)
		})
	})

	describe("grain", () => {
		beforeEach(() => {
			testPlayer = new RandomPlayer("Test")
		})

		it("should start with 0 grain", () => {
			expect(testPlayer.grain).toBe(0)
		})

		it("should be able to pay existing grain", () => {
			testPlayer.gainGrain(5)
			testPlayer.useGrain(3)
			expect(testPlayer.grain).toBe(2)
		})

		it("should not be able to have more than 8 grain", () => {
			testPlayer.gainGrain(9999)
			expect(testPlayer.grain).toBe(8)
		})

		it("should not be able to pay more grain than available", () => {
			expect(() => {
				testPlayer.useGrain(1)
			}).toThrow()
		})
	})

	describe("certificates", () => {
		beforeEach(() => {
			testPlayer = new RandomPlayer("Test")
		})

		it("should not be able to go higher than 4", () => {
			expect(testPlayer.certificates).toBe(0)
			testPlayer.certificates += 10
			expect(testPlayer.certificates).toBe(4)
		})

		it("should not be able to go lower than 0", () => {
			expect(testPlayer.certificates).toBe(0)
			testPlayer.certificates = 3
			expect(testPlayer.certificates).toBe(3)
			testPlayer.certificates -= 10
			expect(testPlayer.certificates).toBe(0)
		})

		it("should be able to upgrade to 6 once upgraded", () => {
			testPlayer.certificates = 6
			expect(testPlayer.certificates).toBe(4)

			testPlayer.upgrades.certificateUpgrade = UpgradeType.UPGRADED

			testPlayer.certificates += 1
			expect(testPlayer.certificates).toBe(6)

			testPlayer.certificates += 1
			expect(testPlayer.certificates).toBe(6)
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
			expect(testPlayer.strength()).toBe(6)
		})

		it("should have 3 base strength with fully upgraded player board", () => {
			testPlayer.upgrades.strengthUpgradeOne = UpgradeType.UPGRADED
			testPlayer.upgrades.strengthUpgradeTwo = UpgradeType.UPGRADED
			expect(testPlayer.strength()).toBe(3)
		})
	})

	describe("card limit", () => {
		it("should have card limit of 4 after start", () => {
			expect(testPlayer.cardLimit()).toBe(4)
		})

		it("should have card limit of 5 after first upgrade", () => {
			testPlayer.upgrades.handLimitUpgradeOne = UpgradeType.UPGRADED
			expect(testPlayer.cardLimit()).toBe(5)
		})

		it("should have card limit of 6 after first and second upgrade", () => {
			testPlayer.upgrades.handLimitUpgradeOne = UpgradeType.UPGRADED
			testPlayer.upgrades.handLimitUpgradeTwo = UpgradeType.UPGRADED
			expect(testPlayer.cardLimit()).toBe(6)
		})
	})
})
