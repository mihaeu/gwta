import { describe, it } from "node:test"
import { deepEqual } from "node:assert"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { Serrano } from "../../src/cards.js"
import { NeutralBuildingF } from "../../src/buildings/neutralBuildingF.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { HelpFarmerOptions } from "../../src/actions/helpFarmerOptions.js"
import { BlueFarmer, HandColor } from "../../src/farmer.js"

describe("Neutral Building F", () => {
	it("should list help farmer options if there are any", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.handCards.push(new Serrano())
		gameBoard.blueFarmers[0].addFarmer(new BlueFarmer(HandColor.BLACK, 3))

		const neutralBuildingF = new NeutralBuildingF()
		deepEqual(neutralBuildingF.options(gameBoard, one), [new CertificateOption(1), new HelpFarmerOptions(0)])
	})

	it("should list only increase certificate option if there are no help farmer options", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()

		const neutralBuildingF = new NeutralBuildingF()
		deepEqual(neutralBuildingF.options(gameBoard, one), [new CertificateOption(1)])
	})
})
