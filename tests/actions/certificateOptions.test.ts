import { describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayers } from "../testUtils.js"
import { CertificateOptions } from "../../src/actions/certificateOptions.js"
import { CertificateOption } from "../../src/options/certificateOption.js"
import { UpgradeType } from "../../src/player.js"

describe("Certificate Options", () => {
	it("should present options depending on the number of certificates a player has", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		expect(new CertificateOptions().resolve(gameBoard, one)).toEqual([new CertificateOption(0)])

		one.certificates = 4
		expect(new CertificateOptions().resolve(gameBoard, one)).toEqual([
			new CertificateOption(0),
			new CertificateOption(-1),
			new CertificateOption(-2),
			new CertificateOption(-3),
			new CertificateOption(-4),
		])
	})

	it("should present more options if certificates were upgraded", () => {
		const { gameBoard, one } = gameBoardWithTwoPlayers()
		one.upgrades.certificateUpgrade = UpgradeType.UPGRADED
		expect(new CertificateOptions().resolve(gameBoard, one)).toEqual([new CertificateOption(0)])

		one.certificates = 6
		expect(new CertificateOptions().resolve(gameBoard, one)).toEqual([
			new CertificateOption(0),
			new CertificateOption(-2),
			new CertificateOption(-3),
			new CertificateOption(-4),
			new CertificateOption(-5),
			new CertificateOption(-6),
		])
	})
})
