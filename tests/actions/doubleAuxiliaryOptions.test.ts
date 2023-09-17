// @ts-ignore
import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { DoubleAuxiliaryOptions } from "../../src/actions/doubleAuxiliaryOptions.js"
import { UpgradeType } from "../../src/player.js"
import { GainCoinOption } from "../../src/options/gainCoinOption.js"

describe("Double Auxiliary Options", () => {
	it("should not have any options for a player without upgrades", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toHaveLength(0)
	})

	it("should see 2 coin option if upgraded", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.gainCoinDouble = UpgradeType.UPGRADED
		expect(new DoubleAuxiliaryOptions().resolve(gameBoard, one)).toEqual([new GainCoinOption(2)])
	})

	it("should fail", () => {
		expect(true).toBeFalse()
	})
})
