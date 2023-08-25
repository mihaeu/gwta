import { Building, NeutralBuilding, NoBuilding } from "./buildings.js"

export abstract class Node {
	private readonly children: Node[] = []

	addChild(node: Node) {
		this.children.push(node)
	}

	isEmpty(): boolean {
		return true
	}

	childNodes() {
		return this.children
	}

	nextNonEmptyDescendants(): Node[] {
		if (this.children.every((node) => !node.isEmpty())) {
			return this.children
		}

		const nonEmptyNodes: Set<Node> = new Set()
		for (const child of this.children) {
			child.isEmpty()
				? child
						.nextNonEmptyDescendants()
						.forEach((descendant) => nonEmptyNodes.add(descendant))
				: nonEmptyNodes.add(child)
		}
		return [...nonEmptyNodes]
	}
}

export class BuildingNode extends Node {
	private building: Building = new NoBuilding()

	addOrUpgradeBuilding(building: Building) {
		this.building = building
	}

	isEmpty(): boolean {
		return this.building instanceof NoBuilding
	}
}

export class FarmerNode extends Node {
	private hasFarmer = false
	addFarmer() {
		this.hasFarmer = true
	}

	isEmpty(): boolean {
		return !this.hasFarmer
	}
}

export class BuenosAiresNode extends Node {
	isEmpty(): boolean {
		return false
	}
}

export class NeutralBuildingNode extends BuildingNode {
	private readonly neutralBuilding: NeutralBuilding

	constructor(neutralBuilding: NeutralBuilding) {
		super()
		this.neutralBuilding = neutralBuilding
	}

	isEmpty(): boolean {
		return false
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
export class BasicBuilding1 extends BuildingNode {}
export class BasicBuilding2 extends BuildingNode {}
export class BasicBuilding3 extends BuildingNode {}
export class BasicBuilding4 extends BuildingNode {}
export class BasicBuilding5 extends BuildingNode {}
export class BasicBuilding6 extends BuildingNode {}
export class BasicBuilding7 extends BuildingNode {}
export class GrainBuilding1 extends BuildingNode {}
export class GrainBuilding2 extends BuildingNode {}
export class GrainBuilding3 extends BuildingNode {}
export class GrainBuilding4 extends BuildingNode {}
export class GrainBuilding5 extends BuildingNode {}
export class GrainBuilding6 extends BuildingNode {}
export class GrainBuilding7 extends BuildingNode {}
export class GrainBuilding8 extends BuildingNode {}
export class SpecialBuilding1 extends BuildingNode {}
export class SpecialBuilding2 extends BuildingNode {}
export class SpecialBuilding3 extends BuildingNode {}
export class SpecialBuilding4 extends BuildingNode {}
export class SpecialGrainBuilding1 extends BuildingNode {}
export class SpecialGrainBuilding2 extends BuildingNode {}
export class SpecialGrainBuilding3 extends BuildingNode {}
export class BuenosAiresExit1 extends BuenosAiresNode {}
export class BuenosAiresExit2 extends BuenosAiresNode {}
export class BuenosAiresExit3 extends BuenosAiresNode {}
export class BuenosAiresExit4 extends BuenosAiresNode {}
export class BuenosAiresExit5 extends BuenosAiresNode {}
export class BuenosAiresExit6 extends BuenosAiresNode {}
export class BuenosAiresExit7 extends BuenosAiresNode {}
