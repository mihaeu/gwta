import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { UpgradeType } from "../../src/player.js"

describe("Certificate Option", () => {
	it("should give certificates to the player if count positive", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		new CertificateOption(3).resolve(gameBoard, one)

		expect(one.certificates).toBe(3)
	})

	it("should take certificates from the player if count negative", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.certificates = 4
		expect(one.certificates).toBe(4)

		new CertificateOption(-3).resolve(gameBoard, one)
		expect(one.certificates).toBe(1)
	})

	it("should jump from 4 to 6 for last upgrade", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.certificateUpgrade = UpgradeType.UPGRADED
		one.certificates = 4
		expect(one.certificates).toBe(4)

		new CertificateOption(1).resolve(gameBoard, one)
		expect(one.certificates).toBe(6)
	})
})
