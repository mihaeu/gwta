import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { PlayObjectiveCardOption } from "../../src/options/playObjectiveCardOption.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { PlayObjectiveCardOptions } from "../../src/actions/playObjectiveCardOptions.js"
import { Objectives } from "../../src/objectives.js"
import { ObjectiveCard } from "../../src/objectiveCard.js"

describe("Play Objective Card Options", () => {
	it("should show options for each objective card on hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()

		expect(new PlayObjectiveCardOptions().resolve(gameBoard, one)).toBeEmpty()

		const objective1 = new ObjectiveCard(100, new CertificateOption(1), 4, -2, new Objectives())
		const objective2 = new ObjectiveCard(101, new CertificateOption(1), 3, -2, new Objectives())
		one.handCards.push(objective1, objective2)
		expect(new PlayObjectiveCardOptions().resolve(gameBoard, one)).toEqual([
			new PlayObjectiveCardOption(objective1),
			new PlayObjectiveCardOption(objective2),
		])
	})
})
