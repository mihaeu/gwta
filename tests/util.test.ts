import { describe, expect, it } from "bun:test"
import { getAllCombinations, pluralize } from "../src/util.js"

describe("util", () => {
	it("should pluralize words", () => {
		expect(pluralize("card", 1)).toBe("1 card")
		expect(pluralize("card", 2)).toBe("2 cards")
		expect(pluralize("card", -1)).toBe("-1 cards")
	})

	it("should compute all combinations of an array", () => {
		expect(getAllCombinations([1, 2, 3])).toEqual([[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]])
	})
})
