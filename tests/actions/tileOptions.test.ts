import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { TileOptions } from "../../src/actions/tileOptions.js"
import { BlueFarmer, HandColor } from "../../src/farmer.js"
import { Carpenter } from "../../src/tiles.js"
import { TileOption } from "../../src/options/tileOption.js"

describe("Tile Options", () => {
	it("should list all tiles with indexes if game is still running", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const tiles = [new Carpenter(), new BlueFarmer(HandColor.BLACK, 7)]
		expect(new TileOptions(tiles, false).resolve(gameBoard, one)).toEqual([new TileOption(0, tiles), new TileOption(1, tiles)])
	})

	it("should list only farmer tiles if game is over", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		const tiles = [new Carpenter(), new BlueFarmer(HandColor.BLACK, 7)]
		expect(new TileOptions(tiles, true).resolve(gameBoard, one)).toEqual([new TileOption(1, tiles)])
	})
})
