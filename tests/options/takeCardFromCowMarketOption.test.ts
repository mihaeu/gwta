import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { AberdeenAngus, Patagonico } from "../../src/cards.js"
import { TakeCardFromCowMarketOption } from "../../src/options/takeCardFromCowMarketOption.js"

describe("Take Card From Cow Market Option", () => {
	it("should remove the card from the cow market and add it to the players hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		gameBoard.cowMarket.splice(0, gameBoard.cowMarket.length)
		gameBoard.cowMarket.push(new Patagonico())
		gameBoard.cowMarket.push(new AberdeenAngus(5))
		gameBoard.cowMarket.push(new AberdeenAngus(7))

		deepEqual(gameBoard.cowMarket, [new Patagonico(), new AberdeenAngus(5), new AberdeenAngus(7)])
		deepEqual(one.handCards, [])

		new TakeCardFromCowMarketOption(new AberdeenAngus(7)).resolve(gameBoard, one)

		deepEqual(gameBoard.cowMarket, [new Patagonico(), new AberdeenAngus(5)])
		deepEqual(one.handCards, [new AberdeenAngus(7)])
	})
})
