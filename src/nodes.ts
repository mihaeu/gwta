import { NeutralBuilding } from "./buildings/neutralBuilding.js"
import GameBoard from "./gameBoard.js"
import Player from "./player.js"
import { Building } from "./buildings/building.js"
import { PlayerBuilding } from "./buildings/playerBuilding.js"
import { Option } from "./options/option.js"
import { Farmer } from "./farmer.js"
import { AnyCowCard } from "./cards.js"
import { GainCoinOption } from "./options/gainCoinOption.js"
import { FirstThanSecondsOption } from "./options/firstThanSecondOption.js"
import { CertificateOption } from "./options/certificateOption.js"
import { GainGrainOption } from "./options/gainGrainOption.js"
import { DiscardCardOptions } from "./actions/discardCardOptions.js"

export abstract class Node {
	private readonly children: Node[] = []
	protected actionable?: Building | Farmer

	addChild(node: Node) {
		this.children.push(node)
	}

	isEmpty(): boolean {
		return this.actionable === undefined
	}

	protected riskAction(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return []
	}

	protected riskActionForBenefit(benefit: Option, gameBoard: GameBoard, currentPlayer: Player) {
		const discardOptions = new DiscardCardOptions(new AnyCowCard())
		return this.isOwnedByCurrentPlayer(currentPlayer) && discardOptions.resolve(gameBoard, currentPlayer).length > 0
			? [new FirstThanSecondsOption(benefit, discardOptions)]
			: []
	}

	isOwnedByCurrentPlayer(currentPlayer: Player): boolean {
		return (
			this.actionable !== undefined &&
			this.actionable instanceof PlayerBuilding &&
			this.actionable.player !== undefined &&
			this.actionable.player.equals(currentPlayer)
		)
	}

	nextNonEmptyDescendants(railroadDevelopment: number = 0): Node[] {
		if (this.children.every((node) => !node.isEmpty())) {
			return this.children
		}

		const nonEmptyNodes: Set<Node> = new Set()
		for (const child of this.children) {
			child.isEmpty() ? child.nextNonEmptyDescendants().forEach((descendant) => nonEmptyNodes.add(descendant)) : nonEmptyNodes.add(child)
		}
		return [...nonEmptyNodes].filter((node) => (node instanceof BuenosAiresNode ? node.trainRequirement <= railroadDevelopment : true))
	}

	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options = this.riskAction(gameBoard, currentPlayer)
		if (this.actionable instanceof Farmer || this.actionable instanceof Building) {
			return options.concat(this.actionable.options(gameBoard, currentPlayer))
		}

		return options
	}

	toString() {
		return `${this.constructor.name}(${this.actionable})`
	}
}

export class BuildingNode extends Node {
	toString(): string {
		return `${this.constructor.name}(${this.actionable?.constructor.name ?? "empty"})`
	}
}

export class FarmerNode extends Node {
	protected _reward: number = 0

	get reward(): number {
		return this._reward
	}

	addFarmer(farmer: Farmer) {
		this.actionable = farmer
	}

	helpFarmer(): Farmer {
		const farmer = this.actionable
		this.actionable = undefined
		return farmer as Farmer
	}

	isEmpty(): boolean {
		return this.actionable === undefined
	}

	requiredStrength(): number {
		return this.isEmpty() ? 0 : (this.actionable as Farmer).strength
	}

	toString() {
		return `${this.constructor.name}(${this.actionable})`
	}
}

export class BuenosAiresNode extends Node {
	private readonly _trainRequirement: number

	constructor(trainRequirement: number) {
		super()
		this._trainRequirement = trainRequirement
	}

	get trainRequirement(): number {
		return this._trainRequirement
	}

	isEmpty(): boolean {
		return false
	}

	toString(): string {
		return this.constructor.name
	}
}

export class NeutralBuildingNode extends BuildingNode {
	constructor(neutralBuilding: NeutralBuilding) {
		super()
		this.actionable = neutralBuilding
	}

	isEmpty(): boolean {
		return false
	}
}

export class PlayerBuildingNode extends BuildingNode {
	protected _hasGrain: boolean = false

	building(): PlayerBuilding {
		return this.actionable as PlayerBuilding
	}

	buildOrUpgradeBuilding(building: PlayerBuilding) {
		this.actionable = building
	}

	get hasGrain(): boolean {
		return this._hasGrain
	}
}

export class Start extends Node {}
export class NeutralBuilding1 extends NeutralBuildingNode {}
export class NeutralBuilding2 extends NeutralBuildingNode {}
export class NeutralBuilding3 extends NeutralBuildingNode {}
export class NeutralBuilding4 extends NeutralBuildingNode {}
export class NeutralBuilding5 extends NeutralBuildingNode {}
export class NeutralBuilding6 extends NeutralBuildingNode {}
export class NeutralBuilding7 extends NeutralBuildingNode {}
export class NeutralBuilding8 extends NeutralBuildingNode {}
export class GreenFarmer1 extends FarmerNode {
	protected _reward: number = 0
}
export class GreenFarmer2 extends FarmerNode {
	protected _reward: number = 1
}
export class GreenFarmer3 extends FarmerNode {
	protected _reward: number = 2
}
export class GreenFarmer4 extends FarmerNode {
	protected _reward: number = 3
}
export class BlueFarmer1 extends FarmerNode {
	protected _reward: number = 0
}
export class BlueFarmer2 extends FarmerNode {
	protected _reward: number = 1
}
export class BlueFarmer3 extends FarmerNode {
	protected _reward: number = 2
}
export class BlueFarmer4 extends FarmerNode {
	protected _reward: number = 3
}
export class OrangeFarmer1 extends FarmerNode {
	protected _reward: number = 0
}
export class OrangeFarmer2 extends FarmerNode {
	protected _reward: number = 1
}
export class OrangeFarmer3 extends FarmerNode {
	protected _reward: number = 2
}
export class OrangeFarmer4 extends FarmerNode {
	protected _reward: number = 3
}
export class YellowFarmer1 extends FarmerNode {
	protected _reward: number = 0
}
export class YellowFarmer2 extends FarmerNode {
	protected _reward: number = 1
}
export class YellowFarmer3 extends FarmerNode {
	protected _reward: number = 2
}
export class YellowFarmer4 extends FarmerNode {
	protected _reward: number = 3
}
export class YellowFarmer5 extends FarmerNode {
	protected _reward: number = 4
}
export class YellowFarmer6 extends FarmerNode {
	protected _reward: number = 5
}
export class YellowFarmer7 extends FarmerNode {
	protected _reward: number = 6
}
export class BasicBuilding1 extends PlayerBuildingNode {}
export class BasicBuilding2 extends PlayerBuildingNode {}
export class BasicBuilding3 extends PlayerBuildingNode {}
export class BasicBuilding4 extends PlayerBuildingNode {}
export class BasicBuilding5 extends PlayerBuildingNode {}
export class BasicBuilding6 extends PlayerBuildingNode {}
export class BasicBuilding7 extends PlayerBuildingNode {}
export class GrainBuilding1 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class GrainBuilding2 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class GrainBuilding3 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class GrainBuilding4 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class GrainBuilding5 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class GrainBuilding6 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class GrainBuilding7 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class GrainBuilding8 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class SpecialBuilding1 extends PlayerBuildingNode {
	protected riskAction(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.riskActionForBenefit(new CertificateOption(1), gameBoard, currentPlayer)
	}
}
export class SpecialBuilding2 extends PlayerBuildingNode {
	protected riskAction(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.riskActionForBenefit(new GainCoinOption(1), gameBoard, currentPlayer)
	}
}
export class SpecialBuilding3 extends PlayerBuildingNode {
	protected riskAction(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.riskActionForBenefit(new GainGrainOption(1), gameBoard, currentPlayer)
	}
}
export class SpecialBuilding4 extends PlayerBuildingNode {
	protected riskAction(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.riskActionForBenefit(new GainGrainOption(1), gameBoard, currentPlayer)
	}
}
export class SpecialGrainBuilding1 extends PlayerBuildingNode {
	protected _hasGrain = true

	protected riskAction(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.riskActionForBenefit(new GainCoinOption(2), gameBoard, currentPlayer)
	}
}
export class SpecialGrainBuilding2 extends PlayerBuildingNode {
	protected _hasGrain = true

	protected riskAction(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.riskActionForBenefit(new CertificateOption(1), gameBoard, currentPlayer)
	}
}
export class SpecialGrainBuilding3 extends PlayerBuildingNode {
	protected _hasGrain = true

	protected riskAction(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return this.riskActionForBenefit(new GainGrainOption(1), gameBoard, currentPlayer)
	}
}
export class BuenosAiresExit1 extends BuenosAiresNode {}
export class BuenosAiresExit2 extends BuenosAiresNode {}
export class BuenosAiresExit3 extends BuenosAiresNode {}
export class BuenosAiresExit4 extends BuenosAiresNode {}
export class BuenosAiresExit5 extends BuenosAiresNode {}
export class BuenosAiresExit6 extends BuenosAiresNode {}
export class BuenosAiresExit7 extends BuenosAiresNode {}
