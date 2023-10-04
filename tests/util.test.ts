import { describe, expect, it } from "bun:test"
import { pluralize } from "../src/util.js"

describe("util", () => {
	it("should pluralize words", () => {
		expect(pluralize("card", 1)).toBe("1 card")
		expect(pluralize("card", 2)).toBe("2 cards")
		expect(pluralize("card", -1)).toBe("-1 cards")
	})
})
