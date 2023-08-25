import arrayShuffle from "array-shuffle"

class Building {}
class NeutralBuilding extends Building {}
class BuildingA extends NeutralBuilding {}
class BuildingB extends NeutralBuilding {}
class BuildingC extends NeutralBuilding {}
class BuildingD extends NeutralBuilding {}
class BuildingE extends NeutralBuilding {}
class BuildingF extends NeutralBuilding {}
class BuildingG extends NeutralBuilding {}
class BuildingH extends NeutralBuilding {}
class NoBuilding extends NeutralBuilding {}

interface Tile {}
class Farmer implements Tile {}
class BlueFarmer extends Farmer {}
class GreenFarmer extends Farmer {}
class OrangeFarmer extends Farmer {}
class YellowFarmer extends Farmer {}
class Worker implements Tile {
	private readonly strong: boolean = false

	constructor(strong: boolean = false) {
		this.strong = strong
	}
}

class Herder extends Worker {}
class Carpenter extends Worker {}
class Machinist extends Worker {}
class JobMarketToken {}

abstract class Node {
	private children: Node[] = []

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

class BuildingNode extends Node {
	private building: Building = new NoBuilding()

	addOrUpgradeBuilding(building: Building) {
		this.building = building
	}

	isEmpty(): boolean {
		return this.building instanceof NoBuilding
	}
}

class FarmerNode extends Node {
	private hasFarmer = false
	addFarmer() {
		this.hasFarmer = true
	}

	isEmpty(): boolean {
		return !this.hasFarmer
	}
}

class BuenosAiresNode extends Node {
	isEmpty(): boolean {
		return false
	}
}

class NeutralBuildingNode extends BuildingNode {
	private readonly neutralBuilding: NeutralBuilding

	constructor(neutralBuilding: NeutralBuilding) {
		super()
		this.neutralBuilding = neutralBuilding
	}

	isEmpty(): boolean {
		return false
	}
}

class Start extends Node {}
class NeutralBuilding1 extends NeutralBuildingNode {}
class NeutralBuilding2 extends NeutralBuildingNode {}
class NeutralBuilding3 extends NeutralBuildingNode {}
class NeutralBuilding4 extends NeutralBuildingNode {}
class NeutralBuilding5 extends NeutralBuildingNode {}
class NeutralBuilding6 extends NeutralBuildingNode {}
class NeutralBuilding7 extends NeutralBuildingNode {}
class NeutralBuilding8 extends NeutralBuildingNode {}
class GreenFarmer1 extends FarmerNode {}
class GreenFarmer2 extends FarmerNode {}
class GreenFarmer3 extends FarmerNode {}
class GreenFarmer4 extends FarmerNode {}
class BlueFarmer1 extends FarmerNode {}
class BlueFarmer2 extends FarmerNode {}
class BlueFarmer3 extends FarmerNode {}
class BlueFarmer4 extends FarmerNode {}
class OrangeFarmer1 extends FarmerNode {}
class OrangeFarmer2 extends FarmerNode {}
class OrangeFarmer3 extends FarmerNode {}
class OrangeFarmer4 extends FarmerNode {}
class YellowFarmer1 extends FarmerNode {}
class YellowFarmer2 extends FarmerNode {}
class YellowFarmer3 extends FarmerNode {}
class YellowFarmer4 extends FarmerNode {}
class YellowFarmer5 extends FarmerNode {}
class YellowFarmer6 extends FarmerNode {}
class YellowFarmer7 extends FarmerNode {}
class BasicBuilding1 extends BuildingNode {}
class BasicBuilding2 extends BuildingNode {}
class BasicBuilding3 extends BuildingNode {}
class BasicBuilding4 extends BuildingNode {}
class BasicBuilding5 extends BuildingNode {}
class BasicBuilding6 extends BuildingNode {}
class BasicBuilding7 extends BuildingNode {}
class GrainBuilding1 extends BuildingNode {}
class GrainBuilding2 extends BuildingNode {}
class GrainBuilding3 extends BuildingNode {}
class GrainBuilding4 extends BuildingNode {}
class GrainBuilding5 extends BuildingNode {}
class GrainBuilding6 extends BuildingNode {}
class GrainBuilding7 extends BuildingNode {}
class GrainBuilding8 extends BuildingNode {}
class SpecialBuilding1 extends BuildingNode {}
class SpecialBuilding2 extends BuildingNode {}
class SpecialBuilding3 extends BuildingNode {}
class SpecialBuilding4 extends BuildingNode {}
class SpecialGrainBuilding1 extends BuildingNode {}
class SpecialGrainBuilding2 extends BuildingNode {}
class SpecialGrainBuilding3 extends BuildingNode {}
class BuenosAiresExit1 extends BuenosAiresNode {}
class BuenosAiresExit2 extends BuenosAiresNode {}
class BuenosAiresExit3 extends BuenosAiresNode {}
class BuenosAiresExit4 extends BuenosAiresNode {}
class BuenosAiresExit5 extends BuenosAiresNode {}
class BuenosAiresExit6 extends BuenosAiresNode {}
class BuenosAiresExit7 extends BuenosAiresNode {}

export default class Map {
	public readonly start = new Start()
	private neutralBuilding1 = new NeutralBuilding1(new BuildingA())
	private neutralBuilding2 = new NeutralBuilding2(new BuildingB())
	private neutralBuilding3 = new NeutralBuilding3(new BuildingC())
	private neutralBuilding4 = new NeutralBuilding4(new BuildingD())
	private neutralBuilding5 = new NeutralBuilding5(new BuildingE())
	private neutralBuilding6 = new NeutralBuilding6(new BuildingF())
	private neutralBuilding7 = new NeutralBuilding7(new BuildingG())
	private neutralBuilding8 = new NeutralBuilding8(new BuildingH())
	private greenFarmer1 = new GreenFarmer1()
	private greenFarmer2 = new GreenFarmer2()
	private greenFarmer3 = new GreenFarmer3()
	private greenFarmer4 = new GreenFarmer4()
	private blueFarmer1 = new BlueFarmer1()
	private blueFarmer2 = new BlueFarmer2()
	private blueFarmer3 = new BlueFarmer3()
	private blueFarmer4 = new BlueFarmer4()
	private orangeFarmer1 = new OrangeFarmer1()
	private orangeFarmer2 = new OrangeFarmer2()
	private orangeFarmer3 = new OrangeFarmer3()
	private orangeFarmer4 = new OrangeFarmer4()
	private yellowFarmer1 = new YellowFarmer1()
	private yellowFarmer2 = new YellowFarmer2()
	private yellowFarmer3 = new YellowFarmer3()
	private yellowFarmer4 = new YellowFarmer4()
	private yellowFarmer5 = new YellowFarmer5()
	private yellowFarmer6 = new YellowFarmer6()
	private yellowFarmer7 = new YellowFarmer7()
	private basicBuilding1 = new BasicBuilding1()
	private basicBuilding2 = new BasicBuilding2()
	private basicBuilding3 = new BasicBuilding3()
	private basicBuilding4 = new BasicBuilding4()
	private basicBuilding5 = new BasicBuilding5()
	private basicBuilding6 = new BasicBuilding6()
	private basicBuilding7 = new BasicBuilding7()
	private grainBuilding1 = new GrainBuilding1()
	private grainBuilding2 = new GrainBuilding2()
	private grainBuilding3 = new GrainBuilding3()
	private grainBuilding4 = new GrainBuilding4()
	private grainBuilding5 = new GrainBuilding5()
	private grainBuilding6 = new GrainBuilding6()
	private grainBuilding7 = new GrainBuilding7()
	private grainBuilding8 = new GrainBuilding8()
	private specialBuilding1 = new SpecialBuilding1()
	private specialBuilding2 = new SpecialBuilding2()
	private specialBuilding3 = new SpecialBuilding3()
	private specialBuilding4 = new SpecialBuilding4()
	private specialGrainBuilding1 = new SpecialGrainBuilding1()
	private specialGrainBuilding2 = new SpecialGrainBuilding2()
	private specialGrainBuilding3 = new SpecialGrainBuilding3()
	private buenosAiresExit1 = new BuenosAiresExit1()
	private buenosAiresExit2 = new BuenosAiresExit2()
	private buenosAiresExit3 = new BuenosAiresExit3()
	private buenosAiresExit4 = new BuenosAiresExit4()
	private buenosAiresExit5 = new BuenosAiresExit5()
	private buenosAiresExit6 = new BuenosAiresExit6()
	private buenosAiresExit7 = new BuenosAiresExit7()

	public readonly greenFarmers = [
		this.greenFarmer1,
		this.greenFarmer2,
		this.greenFarmer3,
		this.greenFarmer4,
	]
	public readonly blueFarmers = [
		this.blueFarmer1,
		this.blueFarmer2,
		this.blueFarmer3,
		this.blueFarmer4,
	]
	public readonly orangeFarmers = [
		this.orangeFarmer1,
		this.orangeFarmer2,
		this.orangeFarmer3,
		this.orangeFarmer4,
	]
	public readonly yellowFarmers = [
		this.yellowFarmer1,
		this.yellowFarmer2,
		this.yellowFarmer3,
		this.yellowFarmer4,
		this.yellowFarmer5,
		this.yellowFarmer6,
		this.yellowFarmer7,
	]

	public readonly greenBlueAndOrangeFarmerTiles: Farmer[] = arrayShuffle(
		new Array(12)
			.fill(new GreenFarmer())
			.concat(new Array(12).fill(new BlueFarmer()))
			.concat(new Array(12).fill(new OrangeFarmer())),
	)
	public readonly yellowFarmerTiles: Farmer[] = new Array(15).fill(
		new YellowFarmer(),
	)
	public readonly workerTiles: Worker[] = arrayShuffle(
		new Array(11)
			.fill(new Herder(false))
			.concat(new Array(11).fill(new Carpenter(false)))
			.concat(new Array(11).fill(new Machinist(false)))
			.concat(new Array(8).fill(new Herder(true)))
			.concat(new Array(8).fill(new Carpenter(true)))
			.concat(new Array(8).fill(new Machinist(true))),
	)
	public readonly aTiles: Farmer[] = arrayShuffle(
		this.greenBlueAndOrangeFarmerTiles,
	)
	public readonly bTiles: Worker[] = this.workerTiles.slice(0, 30)
	public readonly cTiles: Tile[] = arrayShuffle(
		this.yellowFarmerTiles.concat(this.workerTiles.slice(30)),
	)
	public readonly jobMarket: Worker | JobMarketToken[]
	public readonly foresightSpaces: Tile[]

	constructor() {
		this.start.addChild(this.neutralBuilding1)
		this.neutralBuilding1.addChild(this.basicBuilding1)
		this.neutralBuilding1.addChild(this.greenFarmer1)
		this.basicBuilding1.addChild(this.grainBuilding1)
		this.grainBuilding1.addChild(this.grainBuilding2)
		this.grainBuilding2.addChild(this.neutralBuilding2)
		this.neutralBuilding2.addChild(this.grainBuilding3)
		this.grainBuilding3.addChild(this.grainBuilding4)
		this.grainBuilding4.addChild(this.basicBuilding2)
		this.basicBuilding2.addChild(this.basicBuilding3)
		this.basicBuilding3.addChild(this.neutralBuilding3)
		this.neutralBuilding3.addChild(this.basicBuilding4)
		this.basicBuilding4.addChild(this.neutralBuilding4)
		this.neutralBuilding4.addChild(this.neutralBuilding5)
		this.neutralBuilding5.addChild(this.grainBuilding5)
		this.grainBuilding5.addChild(this.grainBuilding6)
		this.grainBuilding6.addChild(this.basicBuilding6)
		this.basicBuilding6.addChild(this.neutralBuilding6)
		this.neutralBuilding6.addChild(this.basicBuilding7)
		this.basicBuilding7.addChild(this.neutralBuilding7)
		this.neutralBuilding7.addChild(this.yellowFarmer1)
		this.yellowFarmer1.addChild(this.yellowFarmer2)
		this.yellowFarmer2.addChild(this.yellowFarmer3)
		this.yellowFarmer3.addChild(this.neutralBuilding8)
		this.neutralBuilding8.addChild(this.yellowFarmer4)
		this.yellowFarmer4.addChild(this.yellowFarmer5)
		this.yellowFarmer5.addChild(this.yellowFarmer6)
		this.yellowFarmer6.addChild(this.yellowFarmer7)
		this.yellowFarmer7.addChild(this.buenosAiresExit1)
		this.greenFarmer1.addChild(this.greenFarmer2)
		this.greenFarmer2.addChild(this.greenFarmer3)
		this.greenFarmer3.addChild(this.greenFarmer4)
		this.greenFarmer4.addChild(this.specialGrainBuilding1)
		this.specialGrainBuilding1.addChild(this.specialGrainBuilding2)
		this.specialGrainBuilding2.addChild(this.neutralBuilding2)
		this.neutralBuilding2.addChild(this.blueFarmer1)
		this.blueFarmer1.addChild(this.blueFarmer2)
		this.blueFarmer2.addChild(this.blueFarmer3)
		this.blueFarmer3.addChild(this.blueFarmer4)
		this.blueFarmer4.addChild(this.specialBuilding1)
		this.specialBuilding1.addChild(this.neutralBuilding3)
		this.neutralBuilding3.addChild(this.basicBuilding5)
		this.neutralBuilding5.addChild(this.specialGrainBuilding3)
		this.specialGrainBuilding3.addChild(this.specialBuilding2)
		this.specialBuilding2.addChild(this.orangeFarmer1)
		this.orangeFarmer1.addChild(this.orangeFarmer2)
		this.orangeFarmer2.addChild(this.orangeFarmer3)
		this.orangeFarmer3.addChild(this.orangeFarmer4)
		this.orangeFarmer4.addChild(this.neutralBuilding6)
		this.neutralBuilding6.addChild(this.grainBuilding7)
		this.grainBuilding7.addChild(this.neutralBuilding7)
		this.yellowFarmer2.addChild(this.grainBuilding8)
		this.grainBuilding8.addChild(this.yellowFarmer3)
		this.neutralBuilding8.addChild(this.specialBuilding3)
		this.specialBuilding3.addChild(this.yellowFarmer4)
		this.yellowFarmer5.addChild(this.specialBuilding4)
		this.specialBuilding4.addChild(this.yellowFarmer6)
		this.yellowFarmer6.addChild(this.buenosAiresExit2)
		this.yellowFarmer4.addChild(this.buenosAiresExit3)
		this.neutralBuilding8.addChild(this.buenosAiresExit4)
		this.yellowFarmer1.addChild(this.buenosAiresExit5)
		this.neutralBuilding7.addChild(this.buenosAiresExit6)
		this.neutralBuilding6.addChild(this.buenosAiresExit7)

		this.seedFarmers()
		this.jobMarket = this.bTiles.splice(0, 5)
		this.jobMarket.push(new JobMarketToken())
		this.foresightSpaces = this.aTiles
			.splice(0, 2)
			.concat(this.bTiles.splice(0, 2))
			.concat(this.cTiles.splice(0, 2))
	}

	private seedFarmers() {
		const seedFarmers = this.aTiles.splice(0, 5)
		seedFarmers.forEach((farmer) => {
			let emptyFarmerTile: FarmerNode | undefined
			if (farmer instanceof GreenFarmer) {
				emptyFarmerTile = this.greenFarmers.find((farmer) => farmer.isEmpty())
			} else if (farmer instanceof BlueFarmer) {
				emptyFarmerTile = this.blueFarmers.find((farmer) => farmer.isEmpty())
			} else if (farmer instanceof OrangeFarmer) {
				emptyFarmerTile = this.orangeFarmers.find((farmer) => farmer.isEmpty())
			}

			if (emptyFarmerTile === undefined) {
				return
			}
			emptyFarmerTile.addFarmer()
		})
	}
}
