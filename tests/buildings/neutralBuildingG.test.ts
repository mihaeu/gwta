import { describe, expect, it } from "bun:test"
import { MoveTrainOptions } from "../../src/actions/moveTrainOptions.js"
import { NeutralBuildingG } from "../../src/buildings/neutralBuildingG.js"
import { DoubleAuxiliaryOptions } from "../../src/actions/doubleAuxiliaryOptions.js"

describe("Neutral Building G", () => {
	it("should always list double auxiliary action and move train action", () => {
		const neutralBuildingG = new NeutralBuildingG()
		expect(neutralBuildingG.options()).toEqual([new MoveTrainOptions(), new DoubleAuxiliaryOptions()])
	})
})
