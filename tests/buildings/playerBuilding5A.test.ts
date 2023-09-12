// @ts-ignore
import { beforeEach, describe, expect, it } from "bun:test"
import { gameBoardWithTwoPlayersAndBuildings } from "../testUtils.js"
import GameBoard from "../../src/gameBoard.js"
import Player, { UpgradeType } from "../../src/player.js"
import { PlayerBuildingNode } from "../../src/nodes.js"
import { PlayerBuilding5A } from "../../src/buildings/playerBuilding5A.js"
import { GainGrainOption } from "../../src/options/gainGrainOption.js"
import { TokenToPortOptions } from "../../src/actions/tokenToPortOptions.js"

describe("Player Building 5A", () => {
	let gameBoard: GameBoard
	let one: Player
	let two: Player
	let playerBuildingOfPlayerOne: PlayerBuildingNode

	beforeEach(() => {
		const setUp = gameBoardWithTwoPlayersAndBuildings(new PlayerBuilding5A())
		gameBoard = setUp.gameBoard
		one = setUp.one
		two = setUp.two
		playerBuildingOfPlayerOne = gameBoard.playerBuildings(one)[0]
	})

	it("should not list actions on buildings of other players", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, two)).toHaveLength(0)
	})

	it("should only see grain if there are no upgrades available", () => {
		one.upgrades.gainCoinDouble = UpgradeType.UPGRADED
		one.upgrades.drawAndDiscardCardDouble = UpgradeType.UPGRADED
		one.upgrades.grainForCertificateAndGoldSingle = UpgradeType.UPGRADED
		one.upgrades.grainForCertificateAndGoldDouble = UpgradeType.UPGRADED
		one.upgrades.goldForGrainSingle = UpgradeType.UPGRADED
		one.upgrades.goldForGrainDouble = UpgradeType.UPGRADED
		one.upgrades.goldForTrainSingle = UpgradeType.UPGRADED
		one.upgrades.goldForTrainDouble = UpgradeType.UPGRADED
		one.upgrades.revertTrainForCardRemovalSingle = UpgradeType.UPGRADED
		one.upgrades.revertTrainForCardRemovalDouble = UpgradeType.UPGRADED
		one.upgrades.movementUpgradeOne = UpgradeType.UPGRADED
		one.upgrades.movementUpgradeTwo = UpgradeType.UPGRADED
		one.upgrades.handLimitUpgradeOne = UpgradeType.UPGRADED
		one.upgrades.handLimitUpgradeTwo = UpgradeType.UPGRADED
		one.upgrades.certificateUpgrade = UpgradeType.UPGRADED
		one.upgrades.strengthUpgradeOne = UpgradeType.UPGRADED
		one.upgrades.strengthUpgradeTwo = UpgradeType.UPGRADED
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([new GainGrainOption(2)])
	})

	it("should see move token to rotterdam port one option", () => {
		expect(playerBuildingOfPlayerOne.options(gameBoard, one)).toEqual([
			new GainGrainOption(2),
			new TokenToPortOptions(UpgradeType.WHITE, gameBoard.rotterdam.portOne),
		])
	})
})
