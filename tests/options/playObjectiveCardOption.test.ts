import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { PlayObjectiveCardOption } from "../../src/options/playObjectiveCardOption.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { Objectives } from "../../src/objectives.js"
import { ObjectiveCard } from "../../src/objectiveCard.js"

describe("Play Objective Card Option", () => {
	it("should show options for each objective card on hand", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()

		const objective = new ObjectiveCard(100, new CertificateOption(1), 4, -2, new Objectives())
		one.handCards.push(objective)

		expect(one.handCards).toContain(objective)
		expect(new PlayObjectiveCardOption(objective).resolve(gameBoard, one)).toBeEmpty()
		expect(one.playedObjectives).toEqual([objective])
		expect(one.handCards).not.toContain(objective)
	})
})
