import arrayShuffle from "array-shuffle"
import {
	BasicBuilding1,
	BasicBuilding2,
	BasicBuilding3,
	BasicBuilding4,
	BasicBuilding5,
	BasicBuilding6,
	BasicBuilding7,
	BlueFarmer1,
	BlueFarmer2,
	BlueFarmer3,
	BlueFarmer4,
	BuenosAiresExit1,
	BuenosAiresExit2,
	BuenosAiresExit3,
	BuenosAiresExit4,
	BuenosAiresExit5,
	BuenosAiresExit6,
	BuenosAiresExit7,
	FarmerNode,
	GrainBuilding1,
	GrainBuilding2,
	GrainBuilding3,
	GrainBuilding4,
	GrainBuilding5,
	GrainBuilding6,
	GrainBuilding7,
	GrainBuilding8,
	GreenFarmer1,
	GreenFarmer2,
	GreenFarmer3,
	GreenFarmer4,
	NeutralBuilding1,
	NeutralBuilding2,
	NeutralBuilding3,
	NeutralBuilding4,
	NeutralBuilding5,
	NeutralBuilding6,
	NeutralBuilding7,
	NeutralBuilding8,
	Node,
	OrangeFarmer1,
	OrangeFarmer2,
	OrangeFarmer3,
	OrangeFarmer4,
	SpecialBuilding1,
	SpecialBuilding2,
	SpecialBuilding3,
	SpecialBuilding4,
	SpecialGrainBuilding1,
	SpecialGrainBuilding2,
	SpecialGrainBuilding3,
	Start,
	YellowFarmer1,
	YellowFarmer2,
	YellowFarmer3,
	YellowFarmer4,
	YellowFarmer5,
	YellowFarmer6,
	YellowFarmer7,
} from "./nodes.js"
import { BuildingB, BuildingC, BuildingD, BuildingE, BuildingF, BuildingG, BuildingH } from "./buildings/buildings.js"
import {
	BlueFarmer,
	Carpenter,
	Farmer,
	GreenFarmer,
	HandColor,
	Herder,
	JobMarketToken,
	Machinist,
	OrangeFarmer,
	Tile,
	Worker,
	YellowFarmer,
} from "./tiles.js"
import { AberdeenAngus, BlancoOrejinegro, Caracu, Chaquenyo, CowCard, Franqueiro, Serrano } from "./cards.js"
import Player from "./player.js"
import { BuildingA } from "./buildings/buildingA.js"

export default class GameBoard {
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
	private buenosAiresExit1 = new BuenosAiresExit1(0)
	private buenosAiresExit2 = new BuenosAiresExit2(3)
	private buenosAiresExit3 = new BuenosAiresExit3(6)
	private buenosAiresExit4 = new BuenosAiresExit4(9)
	private buenosAiresExit5 = new BuenosAiresExit5(13)
	private buenosAiresExit6 = new BuenosAiresExit6(17)
	private buenosAiresExit7 = new BuenosAiresExit7(23)
	private locations: Node[] = [
		this.neutralBuilding1,
		this.neutralBuilding2,
		this.neutralBuilding3,
		this.neutralBuilding4,
		this.neutralBuilding5,
		this.neutralBuilding6,
		this.neutralBuilding7,
		this.neutralBuilding8,
		this.greenFarmer1,
		this.greenFarmer2,
		this.greenFarmer3,
		this.greenFarmer4,
		this.blueFarmer1,
		this.blueFarmer2,
		this.blueFarmer3,
		this.blueFarmer4,
		this.orangeFarmer1,
		this.orangeFarmer2,
		this.orangeFarmer3,
		this.orangeFarmer4,
		this.yellowFarmer1,
		this.yellowFarmer2,
		this.yellowFarmer3,
		this.yellowFarmer4,
		this.yellowFarmer5,
		this.yellowFarmer6,
		this.yellowFarmer7,
		this.basicBuilding1,
		this.basicBuilding2,
		this.basicBuilding3,
		this.basicBuilding4,
		this.basicBuilding5,
		this.basicBuilding6,
		this.basicBuilding7,
		this.grainBuilding1,
		this.grainBuilding2,
		this.grainBuilding3,
		this.grainBuilding4,
		this.grainBuilding5,
		this.grainBuilding6,
		this.grainBuilding7,
		this.grainBuilding8,
		this.specialBuilding1,
		this.specialBuilding2,
		this.specialBuilding3,
		this.specialBuilding4,
		this.specialGrainBuilding1,
		this.specialGrainBuilding2,
		this.specialGrainBuilding3,
	]

	public readonly greenFarmers = [this.greenFarmer1, this.greenFarmer2, this.greenFarmer3, this.greenFarmer4]
	public readonly blueFarmers = [this.blueFarmer1, this.blueFarmer2, this.blueFarmer3, this.blueFarmer4]
	public readonly orangeFarmers = [this.orangeFarmer1, this.orangeFarmer2, this.orangeFarmer3, this.orangeFarmer4]
	public readonly yellowFarmers = [
		this.yellowFarmer1,
		this.yellowFarmer2,
		this.yellowFarmer3,
		this.yellowFarmer4,
		this.yellowFarmer5,
		this.yellowFarmer6,
		this.yellowFarmer7,
	]

	public readonly aTiles: Farmer[] = arrayShuffle([
		new GreenFarmer(HandColor.GREEN, 3),
		new GreenFarmer(HandColor.GREEN, 4),
		new GreenFarmer(HandColor.GREEN, 4),
		new GreenFarmer(HandColor.BLACK, 4),
		new GreenFarmer(HandColor.GREEN, 5),
		new GreenFarmer(HandColor.GREEN, 5),
		new GreenFarmer(HandColor.BLACK, 5),
		new GreenFarmer(HandColor.GREEN, 6),
		new GreenFarmer(HandColor.BLACK, 6),
		new GreenFarmer(HandColor.BLACK, 6),
		new GreenFarmer(HandColor.BLACK, 7),
		new GreenFarmer(HandColor.BLACK, 7),
		new OrangeFarmer(HandColor.GREEN, 3),
		new OrangeFarmer(HandColor.GREEN, 4),
		new OrangeFarmer(HandColor.GREEN, 4),
		new OrangeFarmer(HandColor.BLACK, 4),
		new OrangeFarmer(HandColor.GREEN, 5),
		new OrangeFarmer(HandColor.GREEN, 5),
		new OrangeFarmer(HandColor.BLACK, 5),
		new OrangeFarmer(HandColor.GREEN, 6),
		new OrangeFarmer(HandColor.BLACK, 6),
		new OrangeFarmer(HandColor.BLACK, 6),
		new OrangeFarmer(HandColor.BLACK, 7),
		new OrangeFarmer(HandColor.BLACK, 7),
		new BlueFarmer(HandColor.GREEN, 3),
		new BlueFarmer(HandColor.GREEN, 4),
		new BlueFarmer(HandColor.GREEN, 4),
		new BlueFarmer(HandColor.BLACK, 4),
		new BlueFarmer(HandColor.GREEN, 5),
		new BlueFarmer(HandColor.GREEN, 5),
		new BlueFarmer(HandColor.BLACK, 5),
		new BlueFarmer(HandColor.GREEN, 6),
		new BlueFarmer(HandColor.BLACK, 6),
		new BlueFarmer(HandColor.BLACK, 6),
		new BlueFarmer(HandColor.BLACK, 7),
		new BlueFarmer(HandColor.BLACK, 7),
	])
	public readonly bTiles: Worker[] = arrayShuffle([
		new Carpenter(false),
		new Carpenter(false),
		new Carpenter(false),
		new Carpenter(false),
		new Carpenter(false),
		new Carpenter(false),
		new Carpenter(false),
		new Carpenter(false),
		new Carpenter(true),
		new Carpenter(true),
		new Carpenter(true),
		new Carpenter(true),
		new Carpenter(true),
		new Herder(false),
		new Herder(false),
		new Herder(false),
		new Herder(false),
		new Herder(false),
		new Herder(false),
		new Herder(false),
		new Herder(false),
		new Herder(true),
		new Herder(true),
		new Herder(true),
		new Herder(true),
		new Herder(true),
		new Machinist(false),
		new Machinist(false),
		new Machinist(false),
		new Machinist(false),
		new Machinist(false),
		new Machinist(false),
		new Machinist(false),
		new Machinist(false),
		new Machinist(true),
		new Machinist(true),
		new Machinist(true),
		new Machinist(true),
		new Machinist(true),
	])
	public readonly cTiles: Tile[] = arrayShuffle([
		new YellowFarmer(HandColor.BLACK, 5),
		new YellowFarmer(HandColor.BLACK, 5),
		new YellowFarmer(HandColor.BLACK, 5),
		new YellowFarmer(HandColor.BLACK, 6),
		new YellowFarmer(HandColor.BLACK, 6),
		new YellowFarmer(HandColor.BLACK, 6),
		new YellowFarmer(HandColor.BLACK, 7),
		new YellowFarmer(HandColor.BLACK, 7),
		new YellowFarmer(HandColor.BLACK, 7),
		new YellowFarmer(HandColor.BLACK, 7),
		new YellowFarmer(HandColor.BLACK, 8),
		new YellowFarmer(HandColor.BLACK, 8),
		new YellowFarmer(HandColor.BLACK, 8),
		new YellowFarmer(HandColor.BLACK, 8),
		new YellowFarmer(HandColor.BLACK, 8),
		new Carpenter(false),
		new Carpenter(false),
		new Carpenter(false),
		new Carpenter(true),
		new Carpenter(true),
		new Carpenter(true),
		new Herder(false),
		new Herder(false),
		new Herder(false),
		new Herder(true),
		new Herder(true),
		new Herder(true),
		new Herder(true),
		new Machinist(false),
		new Machinist(false),
		new Machinist(false),
		new Machinist(true),
		new Machinist(true),
		new Machinist(true),
	])
	public readonly jobMarket: Array<Worker | JobMarketToken>
	public readonly foresightSpacesA: Tile[]
	public readonly foresightSpacesB: Tile[]
	public readonly foresightSpacesC: Tile[]
	private cowCards: CowCard[] = arrayShuffle([
		new Caracu(2),
		new Caracu(2),
		new Caracu(2),
		new Caracu(3),
		new Caracu(3),
		new Caracu(3),
		new Chaquenyo(),
		new Chaquenyo(),
		new Chaquenyo(),
		new Chaquenyo(),
		new Chaquenyo(),
		new Serrano(),
		new Serrano(),
		new Serrano(),
		new Serrano(),
		new Serrano(),
		new BlancoOrejinegro(),
		new BlancoOrejinegro(),
		new BlancoOrejinegro(),
		new BlancoOrejinegro(),
		new BlancoOrejinegro(),
		new Franqueiro(3),
		new Franqueiro(3),
		new Franqueiro(3),
		new Franqueiro(4),
		new Franqueiro(4),
		new Franqueiro(4),
		new Franqueiro(5),
		new Franqueiro(5),
		new Franqueiro(5),
		new AberdeenAngus(5),
		new AberdeenAngus(5),
		new AberdeenAngus(6),
		new AberdeenAngus(6),
		new AberdeenAngus(7),
		new AberdeenAngus(7),
	])
	public cowMarket: CowCard[] = this.cowCards.splice(0, 9)
	public railroadTrackWithoutStationMasterSpaces = new Array<Player[]>(32)

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
		this.buenosAiresExit1.addChild(this.start)
		this.buenosAiresExit2.addChild(this.start)
		this.buenosAiresExit3.addChild(this.start)
		this.buenosAiresExit4.addChild(this.start)
		this.buenosAiresExit5.addChild(this.start)
		this.buenosAiresExit6.addChild(this.start)
		this.buenosAiresExit7.addChild(this.start)

		this.seedFarmers()
		this.jobMarket = this.bTiles.splice(0, 5)
		this.jobMarket.push(new JobMarketToken())
		this.foresightSpacesA = this.aTiles.splice(0, 2)
		this.foresightSpacesB = this.bTiles.splice(0, 2)
		this.foresightSpacesC = this.cTiles.splice(0, 2)
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
			emptyFarmerTile.addFarmer(farmer)
		})
	}

	isEmpty(selectedLocation: Node) {
		const location = this.locations.find((location) => typeof location === typeof selectedLocation)
		if (location === undefined) {
			throw new Error(`Unable to find location ${selectedLocation}`)
		}
		return selectedLocation.isEmpty()
	}
}
