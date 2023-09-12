// @ts-ignore
import { describe, expect, it } from "bun:test"
import RandomPlayer from "../../src/randomPlayer.js"
import GameBoard from "../../src/gameBoard.js"
import { AddExhaustionCardsToOtherPlayersOption } from "../../src/options/addExhaustionCardsToOtherPlayersOption.js"
import { ExhaustionCard } from "../../src/cards.js"

describe("Add Exhaustion Cards to Other Players Option", () => {
	it("should add exhaustion cards to discard piles of all other players", () => {
		const one = new RandomPlayer("One")
		const two = new RandomPlayer("Two")
		const three = new RandomPlayer("Three")
		const four = new RandomPlayer("Fours")
		const gameBoard = new GameBoard([one, two, three, four])
		new AddExhaustionCardsToOtherPlayersOption().resolve(gameBoard, one)
		expect(one.discardedCards).toHaveLength(0)
		expect(two.discardedCards).toEqual([new ExhaustionCard()])
		expect(three.discardedCards).toEqual([new ExhaustionCard()])
		expect(four.discardedCards).toEqual([new ExhaustionCard()])
	})
})
