import { NeutralBuilding, PlayerBuilding } from "./buildings/buildings.js"
import { Action } from "./actions/action.js"
import { Farmer } from "./tiles.js"
import GameBoard from "./gameBoard.js"
import Player from "./player.js"
import { Building } from "./buildings/building.js"

export abstract class Node {
	private readonly children: Node[] = []
	protected actionable?: Building | Farmer

	addChild(node: Node) {
		this.children.push(node)
	}

	isEmpty(): boolean {
		return this.actionable === undefined
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

	actions(gameBoard: GameBoard, currentPlayer: Player): Action[] {
		if (this.actionable instanceof Farmer || this.actionable instanceof Building) {
			return this.actionable.actions(gameBoard, currentPlayer)
		}

		return []
	}
}

export class BuildingNode extends Node {}

export class FarmerNode extends Node {
	addFarmer(farmer: Farmer) {
		this.actionable = farmer
	}

	isEmpty(): boolean {
		return this.actionable === undefined
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
export class GreenFarmer1 extends FarmerNode {}
export class GreenFarmer2 extends FarmerNode {}
export class GreenFarmer3 extends FarmerNode {}
export class GreenFarmer4 extends FarmerNode {}
export class BlueFarmer1 extends FarmerNode {}
export class BlueFarmer2 extends FarmerNode {}
export class BlueFarmer3 extends FarmerNode {}
export class BlueFarmer4 extends FarmerNode {}
export class OrangeFarmer1 extends FarmerNode {}
export class OrangeFarmer2 extends FarmerNode {}
export class OrangeFarmer3 extends FarmerNode {}
export class OrangeFarmer4 extends FarmerNode {}
export class YellowFarmer1 extends FarmerNode {}
export class YellowFarmer2 extends FarmerNode {}
export class YellowFarmer3 extends FarmerNode {}
export class YellowFarmer4 extends FarmerNode {}
export class YellowFarmer5 extends FarmerNode {}
export class YellowFarmer6 extends FarmerNode {}
export class YellowFarmer7 extends FarmerNode {}
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
export class SpecialBuilding1 extends PlayerBuildingNode {}
export class SpecialBuilding2 extends PlayerBuildingNode {}
export class SpecialBuilding3 extends PlayerBuildingNode {}
export class SpecialBuilding4 extends PlayerBuildingNode {}
export class SpecialGrainBuilding1 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class SpecialGrainBuilding2 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class SpecialGrainBuilding3 extends PlayerBuildingNode {
	protected _hasGrain = true
}
export class BuenosAiresExit1 extends BuenosAiresNode {}
export class BuenosAiresExit2 extends BuenosAiresNode {}
export class BuenosAiresExit3 extends BuenosAiresNode {}
export class BuenosAiresExit4 extends BuenosAiresNode {}
export class BuenosAiresExit5 extends BuenosAiresNode {}
export class BuenosAiresExit6 extends BuenosAiresNode {}
export class BuenosAiresExit7 extends BuenosAiresNode {}
