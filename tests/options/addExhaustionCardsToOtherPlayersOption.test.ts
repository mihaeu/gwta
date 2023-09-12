import { describe, it } from "bun:test"
import { deepEqual } from "node:assert"
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
		deepEqual(one.discardedCards, [])
		deepEqual(two.discardedCards, [new ExhaustionCard()])
		deepEqual(three.discardedCards, [new ExhaustionCard()])
		deepEqual(four.discardedCards, [new ExhaustionCard()])
	})
})
