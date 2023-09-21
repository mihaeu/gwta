import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { ShipOption } from "../../src/options/shipOption.js"
import { Ship, ShipColor } from "../../src/ship.js"
import { UpgradeType } from "../../src/player.js"
import { DrawObjectiveCardOption } from "../../src/options/drawObjectiveCardOption.js"

describe("Ship Option", () => {
	it("should sail the players to the right port and charge them for grain or gold", () => {
		const { gameBoard, one, two } = gameBoardWithTwoPlayers()
		one.gainGrain(1)

		const ship = new Ship(6, 2, 0, ShipColor.TURQUOISE, gameBoard.rotterdam.portOne, UpgradeType.WHITE, 1, new DrawObjectiveCardOption())

		expect(one.grain).toBe(1)
		expect(one.coins).toBe(7)
		expect(one.discardedCards).toBeEmpty()
		expect(ship.players).toBeEmpty()
		new ShipOption(ship).resolve(gameBoard, one)
		expect(one.grain).toBe(0)
		expect(one.coins).toBe(5)
		expect(one.discardedCards).toHaveLength(1)
		expect(ship.players).toHaveLength(1)
	})
})
