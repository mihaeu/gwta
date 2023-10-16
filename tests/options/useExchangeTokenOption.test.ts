import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { UseExchangeTokenOption } from "../../src/options/useExchangeTokenOption.js"
import { Fronterizo, HolandoArgentino, Niata } from "../../src/cards.js"

describe("Use Exchange TokenCard Option", () => {
	it("should draw two cards, remove token and present discard options", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.discardCards()
		one.handCards.push(new HolandoArgentino())
		one.cards = [new Niata(), new Fronterizo()]

		expect(one.handCards).toHaveLength(1)
		expect(one.exchangeTokens).toBe(1)

		const options = new UseExchangeTokenOption().resolve(gameBoard, one)
		expect(one.handCards).toHaveLength(3)
		expect(one.exchangeTokens).toBe(0)
		expect(options).toHaveLength(3)
	})
})
