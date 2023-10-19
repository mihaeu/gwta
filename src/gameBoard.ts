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
	PlayerBuildingNode,
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
import { Carpenter, Herder, JobMarketItem, JobMarketToken, Machinist, Tile, Worker } from "./tiles.js"
import { AberdeenAngus, BlancoOrejinegro, Caracu, Card, Chaquenyo, CowCard, ExhaustionCard, Franqueiro, Serrano } from "./cards.js"
import Player, { UpgradeType } from "./player.js"
import { NeutralBuildingA } from "./buildings/neutralBuildingA.js"
import { NeutralBuildingB } from "./buildings/neutralBuildingB.js"
import { NeutralBuildingC } from "./buildings/neutralBuildingC.js"
import { NeutralBuildingD } from "./buildings/neutralBuildingD.js"
import { NeutralBuildingG } from "./buildings/neutralBuildingG.js"
import { NeutralBuildingH } from "./buildings/neutralBuildingH.js"
import { NeutralBuildingF } from "./buildings/neutralBuildingF.js"
import { NeutralBuildingE } from "./buildings/neutralBuildingE.js"
import { BlueFarmer, Farmer, GreenFarmer, HandColor, OrangeFarmer, YellowFarmer } from "./farmer.js"
import { GainCoinOption } from "./options/gainCoinOption.js"
import { DrawObjectiveCardOption } from "./options/drawObjectiveCardOption.js"
import { FreeFranqueiroOptions } from "./actions/freeFranqueiroOptions.js"
import { MoveTrainOptions } from "./actions/moveTrainOptions.js"
import { Port, PortDistrict, PortSpace } from "./port/port.js"
import { Ship, ShipColor } from "./ship.js"
import { CertificateOption } from "./options/certificateOption.js"
import { FirstThanSecondsOption } from "./options/firstThanSecondOption.js"
import { DrawCardOption } from "./options/drawCardOption.js"
import { DiscardCardOptions } from "./actions/discardCardOptions.js"
import { GainGrainOption } from "./options/gainGrainOption.js"
import { getAllCombinations } from "./util.js"
import { Objectives } from "./objectives.js"
import { ObjectiveCard } from "./objectiveCard.js"

const drawAndDiscardOption = (count: number) => new FirstThanSecondsOption(new DrawCardOption(count), new DiscardCardOptions(count))
export default class GameBoard {
	public readonly startLocation = new Start()
	private neutralBuilding1 = new NeutralBuilding1(new NeutralBuildingA())
	private neutralBuilding2 = new NeutralBuilding2(new NeutralBuildingB())
	private neutralBuilding3 = new NeutralBuilding3(new NeutralBuildingC())
	private neutralBuilding4 = new NeutralBuilding4(new NeutralBuildingD())
	private neutralBuilding5 = new NeutralBuilding5(new NeutralBuildingE())
	private neutralBuilding6 = new NeutralBuilding6(new NeutralBuildingF())
	private neutralBuilding7 = new NeutralBuilding7(new NeutralBuildingG())
	private neutralBuilding8 = new NeutralBuilding8(new NeutralBuildingH())
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
	public readonly neutralBuildings = [
		this.neutralBuilding1,
		this.neutralBuilding2,
		this.neutralBuilding3,
		this.neutralBuilding4,
		this.neutralBuilding5,
		this.neutralBuilding6,
		this.neutralBuilding7,
		this.neutralBuilding8,
	]
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

	public readonly greenFarmers: FarmerNode[] = [this.greenFarmer1, this.greenFarmer2, this.greenFarmer3, this.greenFarmer4]
	public readonly blueFarmers: FarmerNode[] = [this.blueFarmer1, this.blueFarmer2, this.blueFarmer3, this.blueFarmer4]
	public readonly orangeFarmers: FarmerNode[] = [this.orangeFarmer1, this.orangeFarmer2, this.orangeFarmer3, this.orangeFarmer4]
	public readonly yellowFarmers: FarmerNode[] = [
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
	public readonly objectiveCards: Card[] = arrayShuffle([
		new ObjectiveCard(100, new CertificateOption(1), 4, -2, new Objectives().withWestPort(1).withTrainStation(2)),
		new ObjectiveCard(101, new CertificateOption(1), 3, -2, new Objectives().withEastPort(1).withBuilding(1)),
		new ObjectiveCard(102, new CertificateOption(1), 4, -2, new Objectives().withCaracu(1).withTrainStation(1).withOrangeFarmer(1)),
		new ObjectiveCard(103, new CertificateOption(3), 5, -2, new Objectives().withValue3Cow(1).withFranqueiro(1).withAberdeenAngus(1)),
		new ObjectiveCard(104, new MoveTrainOptions(1), 4, -2, new Objectives().withNorthPort(1).withEastPort(1)),
		new ObjectiveCard(105, new MoveTrainOptions(1), 3, -2, new Objectives().withWestPort(1).withBlueFarmer(1).withGreenFarmer(1)),
		new ObjectiveCard(106, new MoveTrainOptions(1), 3, -2, new Objectives().withCaracu(1).withBuilding(2)),
		new ObjectiveCard(107, new MoveTrainOptions(1), 3, -2, new Objectives().withFranqueiro(1).withWestPort(1)),
		new ObjectiveCard(108, drawAndDiscardOption(3), 4, -2, new Objectives().withValue3Cow(2).withTrainStation(1)),
		new ObjectiveCard(109, drawAndDiscardOption(3), 4, -2, new Objectives().withTrainStation(1).withYellowFarmer(1).withBlueFarmer(1)),
		new ObjectiveCard(110, drawAndDiscardOption(3), 3, -2, new Objectives().withBuilding(2).withGreenFarmer(1)),
		new ObjectiveCard(111, new GainCoinOption(3), 2, -2, new Objectives().withValue3Cow(2).withNorthPort(1)),
		new ObjectiveCard(112, new GainCoinOption(2), 5, -2, new Objectives().withValue3Cow(1).withAberdeenAngus(1).withBuilding(1)),
		new ObjectiveCard(113, new GainCoinOption(3), 4, -2, new Objectives().withSouthPort(1).withBuilding(1)),
		new ObjectiveCard(114, new GainCoinOption(3), 3, -2, new Objectives().withNorthPort(1).withBuilding(2)),
		new ObjectiveCard(115, new GainCoinOption(4), 5, -2, new Objectives().withValue18Ship(1)),
		new ObjectiveCard(116, new GainCoinOption(2), 3, -2, new Objectives().withBuilding(1).withYellowFarmer(1).withOrangeFarmer(1)),
		new ObjectiveCard(117, new GainGrainOption(1), 3, -2, new Objectives().withWestPort(1).withBuilding(1).withYellowFarmer(1)),
		new ObjectiveCard(118, new GainGrainOption(1), 4, -2, new Objectives().withValue3Cow(1).withTrainStation(2)),
		new ObjectiveCard(119, new GainGrainOption(1), 3, -2, new Objectives().withValue3Cow(1).withOrangeFarmer(1).withGreenFarmer(1)),
		new ObjectiveCard(120, new GainGrainOption(1), 4, -2, new Objectives().withBuilding(2).withTrainStation(1)),
		new ObjectiveCard(121, new GainGrainOption(1), 4, -2, new Objectives().withValue3Cow(1).withFranqueiro(1).withBuilding(1)),
		new ObjectiveCard(122, new GainGrainOption(1), 5, -2, new Objectives().withSouthPort(1).withTrainStation(1)),
		new ObjectiveCard(123, new GainGrainOption(1), 4, -2, new Objectives().withValue3Cow(1).withFranqueiro(1).withBlueFarmer(1)),
	])
	public jobMarket: Array<JobMarketItem> = []
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
	public static readonly COW_COUNT_PER_PLAYER = [9, 9, 9, 12, 15]
	public cowMarket: CowCard[] = []
	public railroadTrackWithoutStationMasterSpaces = new Array<Player[]>(32).fill([])
	private jobMarketCostPerPlayerCount = [
		[6, 7, 6, 8, 5, 8, 6, 8, 9, 6, 4], // 0 players
		[6, 7, 6, 8, 5, 8, 6, 8, 9, 6, 4], // 1 player
		[6, 6, 7, 7, 6, 6, 8, 8, 5, 5, 8, 8, 6, 6, 8, 8, 9, 9, 6, 6, 4, 4], // 2 players
		[6, 6, 6, 7, 7, 7, 6, 6, 6, 8, 8, 8, 5, 5, 5, 8, 8, 8, 6, 6, 6, 8, 8, 8, 9, 9, 9, 6, 6, 6, 4, 4, 4], // 3 players
		[6, 6, 6, 6, 7, 7, 7, 7, 6, 6, 6, 6, 8, 8, 8, 8, 5, 5, 5, 5, 8, 8, 8, 8, 6, 6, 6, 6, 8, 8, 8, 8, 9, 9, 9, 9, 6, 6, 6, 6, 4, 4, 4, 4], // 4 players
	]

	public readonly leHavre: Port = {
		portOne: [],
		portTwo: [],
		portTwoDiscount: 2,
		west: {
			cost: 1,
			spaces: [
				{ reward: new GainCoinOption(3), victoryPoints: 0 },
				{ reward: new GainCoinOption(4), victoryPoints: 0 },
				{ reward: new GainCoinOption(4), victoryPoints: 0 },
				{ reward: new GainCoinOption(4), victoryPoints: 0 },
			],
		},
		north: {
			cost: 3,
			spaces: [
				{ reward: new GainCoinOption(5), victoryPoints: 1 },
				{ reward: new GainCoinOption(5), victoryPoints: 2 },
				{ reward: new GainCoinOption(6), victoryPoints: 2 },
			],
		},
		east: {
			cost: 5,
			spaces: [
				{ reward: undefined, victoryPoints: 5 },
				{ reward: undefined, victoryPoints: 6 },
				{ reward: undefined, victoryPoints: 7 },
			],
		},
		south: {
			cost: 6,
			spaces: [
				{ reward: new GainCoinOption(9), victoryPoints: 3 },
				{ reward: new GainCoinOption(12), victoryPoints: 3 },
			],
		},
	}

	public readonly rotterdam: Port = {
		portOne: [],
		west: {
			cost: 1,
			spaces: [
				{ reward: new GainCoinOption(6), victoryPoints: 1 },
				{ reward: new GainCoinOption(6), victoryPoints: 0 },
				{ reward: new GainCoinOption(6), victoryPoints: 0 },
			],
		},
		north: {
			cost: 2,
			spaces: [
				{ reward: undefined, victoryPoints: 6 },
				{ reward: undefined, victoryPoints: 5 },
				{ reward: undefined, victoryPoints: 4 },
			],
		},
		east: {
			cost: 4,
			spaces: [
				{ reward: new GainCoinOption(8), victoryPoints: 4 },
				{ reward: new GainCoinOption(6), victoryPoints: 4 },
			],
		},
		south: {
			cost: 7,
			spaces: [
				{ reward: undefined, victoryPoints: 9 },
				{ reward: undefined, victoryPoints: 12 },
			],
		},
	}

	public readonly liverpool: Port = {
		portOne: [],
		portTwo: [],
		portTwoDiscount: 3,
		west: {
			cost: 1,
			spaces: [
				{ reward: new DrawObjectiveCardOption(), victoryPoints: 4 },
				{ reward: new GainCoinOption(6), victoryPoints: 4 },
			],
		},
		north: {
			cost: 4,
			spaces: [
				{ reward: new FreeFranqueiroOptions(), victoryPoints: 4 },
				{ reward: new MoveTrainOptions(4), victoryPoints: 4 },
				{ reward: new GainCoinOption(6), victoryPoints: 7 },
			],
		},
		east: {
			cost: 7,
			spaces: [
				{ reward: undefined, victoryPoints: 12 },
				{ reward: undefined, victoryPoints: 15 },
			],
		},
		south: {
			cost: 9,
			spaces: [
				{ reward: undefined, victoryPoints: 15 },
				{ reward: undefined, victoryPoints: 20 },
			],
		},
	}

	public availableShips = [
		new Ship(0, 0, -2, ShipColor.NONE, undefined, UpgradeType.WHITE, 99),
		new Ship(1, 0, 0, ShipColor.YELLOW, this.leHavre.portOne),
		new Ship(3, 1, 0, ShipColor.TURQUOISE, this.leHavre.portTwo),
		new Ship(5, 1, 0, ShipColor.YELLOW, this.leHavre.portTwo),
		new Ship(6, 2, 0, ShipColor.TURQUOISE, this.rotterdam.portOne, UpgradeType.WHITE, 1, new DrawObjectiveCardOption()),
		new Ship(7, 2, 0, ShipColor.YELLOW, this.rotterdam.portOne, UpgradeType.WHITE, 1, new DrawObjectiveCardOption()),
		new Ship(8, 1, 0, ShipColor.PURPLE, this.rotterdam.portOne, UpgradeType.WHITE, 1, new DrawObjectiveCardOption()),
		new Ship(9, 4, 0, ShipColor.PURPLE, this.liverpool.portOne, UpgradeType.BLACK),
		new Ship(11, 4, 0, ShipColor.TURQUOISE, this.liverpool.portOne, UpgradeType.BLACK),
		new Ship(15, 4, 0, ShipColor.PURPLE, this.liverpool.portTwo, UpgradeType.BLACK),
		new Ship(18, 6, 12, ShipColor.NONE, undefined, UpgradeType.BLACK, 99),
	]
	private readonly remainingShips = arrayShuffle([
		new Ship(4, 2, 1),
		new Ship(7, 1, 3),
		new Ship(8, 3, 3, ShipColor.NONE, undefined, UpgradeType.BLACK),
		new Ship(12, 2, 5, ShipColor.NONE, undefined, UpgradeType.BLACK),
		new Ship(13, 3, 7),
		new Ship(14, 4, 7, ShipColor.NONE, undefined, UpgradeType.BLACK),
		new Ship(16, 5, 9, ShipColor.NONE, undefined, UpgradeType.BLACK),
	])

	constructor(private readonly _players: Player[]) {
		this.startLocation.addChild(this.neutralBuilding1)
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
		this.basicBuilding5.addChild(this.neutralBuilding4)
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
		this.buenosAiresExit1.addChild(this.startLocation)
		this.buenosAiresExit2.addChild(this.startLocation)
		this.buenosAiresExit3.addChild(this.startLocation)
		this.buenosAiresExit4.addChild(this.startLocation)
		this.buenosAiresExit5.addChild(this.startLocation)
		this.buenosAiresExit6.addChild(this.startLocation)
		this.buenosAiresExit7.addChild(this.startLocation)

		this.seedPlayers()
		this.seedRailroad()
		this.seedPorts()
		this.seedCowMarket()
		this.seedFarmers()
		this.seedJobMarket()
		this.foresightSpacesA = this.aTiles.splice(0, 2)
		this.foresightSpacesB = this.bTiles.splice(0, 2)
		this.foresightSpacesC = this.cTiles.splice(0, 2)
	}

	private seedPlayers() {
		const playerBuildings = new Array(10).fill(null).map((_) => Math.round(Math.random()))
		this._players.forEach((player, index) => {
			player.gainCoins(Player.STARTING_COINS + index)
			player.drawCards(player.cardLimit() + index)
			player.setStartBuildings(playerBuildings)
		})
	}

	private seedRailroad() {
		this.railroadTrackWithoutStationMasterSpaces[0] = this.players
	}

	private seedPorts() {
		this.leHavre.portOne = [...this._players]
	}

	private seedCowMarket() {
		this.cowMarket = this.cowCards.splice(0, GameBoard.COW_COUNT_PER_PLAYER[this._players.length])
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

	private seedJobMarket() {
		for (let i = 0; i < 3 * this._players.length - 1; ++i) {
			this.jobMarket.push(this.bTiles.pop() as Worker)
		}
		this.jobMarket.push(new JobMarketToken())
	}

	nextPlayer(): Player {
		return this.players.reduce((previousPlayer, currentPlayer) =>
			previousPlayer.turnsTaken() > currentPlayer.turnsTaken() ? currentPlayer : previousPlayer,
		)
	}

	emptyBuildingLocations(): PlayerBuildingNode[] {
		return this.locations.filter((location) => location instanceof PlayerBuildingNode && location.isEmpty()) as PlayerBuildingNode[]
	}

	playerBuildings(player: Player): PlayerBuildingNode[] {
		return this.locations.filter(
			(location) => location instanceof PlayerBuildingNode && !location.isEmpty() && location.building().player?.name === player.name,
		) as PlayerBuildingNode[]
	}

	availableWorkersWithCost(): [JobMarketItem, number][] {
		const workersWithoutLastRow = this.jobMarket.slice(0, this._players.length * -1)
		return workersWithoutLastRow.map((worker, index) => {
			return [worker, this.jobMarketCostPerPlayerCount[this._players.length][index] + (worker instanceof Worker && worker.strong ? 1 : 0)]
		}) as [Worker, number][]
	}

	/**
	 * @return 0 if no workers are available, otherwise cheapest cost
	 */
	cheapestAvailableWorker(): number {
		return this.availableWorkersWithCost().reduce((cheapest, [jobMarketItem, cost]) => {
			return jobMarketItem instanceof Worker && (cost < cheapest || cheapest === 0) ? cost : cheapest
		}, 0)
	}

	get players(): Player[] {
		return this._players
	}

	endgameScoring(): { [key: string]: ScoreCard } {
		const score: { [key: string]: ScoreCard } = {}
		const objectives = this.collectObjectives()
		this.players.forEach((player) => {
			const buildings = this.playerBuildings(player).reduce((sum, playerLocation) => {
				return sum + playerLocation.building().victoryPoints
			}, 0)
			const tokenEqualsPlayer = (token: Player) => token.equals(player)
			const playerOnSpace = (space: PortSpace) => space.player === player
			let ports =
				(this.leHavre.portTwo?.filter(tokenEqualsPlayer).length ?? 0) +
				this.rotterdam.portOne.filter(tokenEqualsPlayer).length * 2 +
				this.liverpool.portOne.filter(tokenEqualsPlayer).length * 5 +
				(this.liverpool.portTwo?.filter(tokenEqualsPlayer).length ?? 0) * 8 +
				this.leHavre.west.spaces
					.filter(playerOnSpace)
					.concat(this.leHavre.north.spaces.filter(playerOnSpace))
					.concat(this.leHavre.south.spaces.filter(playerOnSpace))
					.concat(this.leHavre.east.spaces.filter(playerOnSpace))
					.concat(this.rotterdam.west.spaces.filter(playerOnSpace))
					.concat(this.rotterdam.north.spaces.filter(playerOnSpace))
					.concat(this.rotterdam.south.spaces.filter(playerOnSpace))
					.concat(this.rotterdam.east.spaces.filter(playerOnSpace))
					.concat(this.liverpool.west.spaces.filter(playerOnSpace))
					.concat(this.liverpool.north.spaces.filter(playerOnSpace))
					.concat(this.liverpool.south.spaces.filter(playerOnSpace))
					.concat(this.liverpool.east.spaces.filter(playerOnSpace))
					.reduce((sum, portSpace) => sum + portSpace.victoryPoints, 0)

			const coins = Math.floor(player.coins / 5)
			const ships = this.availableShips.reduce((total, ship) => {
				return ship.players.some((playerOnShip) => player.equals(playerOnShip)) ? total + ship.victoryPoints : total
			}, 0)
			const trainStations = 0
			const fulfilledObjectiveCards = this.countFulfilledObjectiveCards(player, objectives[player.name])
			const stationMasters = 0
			const helpedFarmers = player.helpedFarmers.length * 2
			const cowCards = this.scoreCowAndExhaustionCards(player)
			const fifthAndSixthWorkers =
				(player.carpenters.length > 4 ? (player.carpenters.length - 4) * 4 : 0) +
				(player.machinists.length > 4 ? (player.machinists.length - 4) * 4 : 0) +
				(player.herders.length > 4 ? (player.herders.length - 4) * 4 : 0) +
				(player.farmers.length > 4 ? (player.farmers.length - 4) * 4 : 0)
			const secondMovementUpgrade = player.upgrades.movementUpgradeTwo === UpgradeType.UPGRADED ? 2 : 0
			const jobMarketToken = player.jobMarketToken instanceof JobMarketToken ? 2 : 0
			score[player.name] = {
				coins,
				buildings,
				ships,
				ports,
				trainStations,
				helpedFarmers,
				cowCards,
				fulfilledObjectiveCards,
				stationMasters,
				fifthAndSixthWorkers,
				secondMovementUpgrade,
				jobMarketToken,
				total:
					coins +
					buildings +
					ships +
					ports +
					trainStations +
					helpedFarmers +
					cowCards +
					fulfilledObjectiveCards +
					stationMasters +
					fifthAndSixthWorkers +
					secondMovementUpgrade +
					jobMarketToken,
			}
		})
		return score
	}

	private scoreCowAndExhaustionCards(player: Player) {
		const allCards = player.handCards.concat(player.discardedCards).concat(player.cards)
		return (
			allCards.reduce((sum: number, card) => (card instanceof CowCard ? sum + card.victoryPoints : sum), 0) -
			allCards.filter((card) => card instanceof ExhaustionCard).length * 2
		)
	}

	refillCowMarket() {
		const cowsToRefill = GameBoard.COW_COUNT_PER_PLAYER[this._players.length] - this.cowMarket.length
		this.cowMarket = this.cowMarket.concat(this.cowCards.splice(0, cowsToRefill))
	}

	public refillShips() {
		this.availableShips = this.availableShips.concat(this.remainingShips.splice(0, 3))
	}

	private countPlayersOnPortDistrict(portDistrict: PortDistrict, currentPlayer: Player): number {
		return portDistrict.spaces.reduce((count, portSpace) => (currentPlayer.equals(portSpace.player) ? count + 1 : count), 0)
	}

	public collectObjectives() {
		const objectives: { [key: string]: Objectives } = {}
		this.players.forEach((player) => {
			const allPlayerCards = player.handCards.concat(player.discardedCards).concat(player.cards)
			objectives[player.name] = new Objectives()
				.withNorthPort(
					this.countPlayersOnPortDistrict(this.leHavre.north, player) +
						this.countPlayersOnPortDistrict(this.rotterdam.north, player) +
						this.countPlayersOnPortDistrict(this.liverpool.north, player),
				)
				.withEastPort(
					this.countPlayersOnPortDistrict(this.leHavre.east, player) +
						this.countPlayersOnPortDistrict(this.rotterdam.east, player) +
						this.countPlayersOnPortDistrict(this.liverpool.east, player),
				)
				.withSouthPort(
					this.countPlayersOnPortDistrict(this.leHavre.south, player) +
						this.countPlayersOnPortDistrict(this.rotterdam.south, player) +
						this.countPlayersOnPortDistrict(this.liverpool.south, player),
				)
				.withWestPort(
					this.countPlayersOnPortDistrict(this.leHavre.west, player) +
						this.countPlayersOnPortDistrict(this.rotterdam.west, player) +
						this.countPlayersOnPortDistrict(this.liverpool.west, player),
				)
				.withCaracu(allPlayerCards.reduce((count: number, card) => (card instanceof Caracu ? count + 1 : count), 0))
				.withFranqueiro(allPlayerCards.reduce((count: number, card) => (card instanceof Franqueiro ? count + 1 : count), 0))
				.withAberdeenAngus(allPlayerCards.reduce((count: number, card) => (card instanceof AberdeenAngus ? count + 1 : count), 0))
				.withValue3Cow(
					allPlayerCards.reduce(
						(count: number, card) =>
							card instanceof Serrano || card instanceof Chaquenyo || card instanceof BlancoOrejinegro ? count + 1 : count,
						0,
					),
				)
				.withBlueFarmer(player.helpedFarmers.reduce((count, farmer) => (farmer instanceof BlueFarmer ? count + 1 : count), 0))
				.withYellowFarmer(player.helpedFarmers.reduce((count, farmer) => (farmer instanceof YellowFarmer ? count + 1 : count), 0))
				.withOrangeFarmer(player.helpedFarmers.reduce((count, farmer) => (farmer instanceof OrangeFarmer ? count + 1 : count), 0))
				.withGreenFarmer(player.helpedFarmers.reduce((count, farmer) => (farmer instanceof GreenFarmer ? count + 1 : count), 0))
				.withBuilding(this.playerBuildings(player).length)
				.withValue18Ship(
					this.availableShips
						.find((ship) => ship.valueRequirement === 18)
						?.players?.reduce((count, shipOwner) => (shipOwner.equals(player) ? count + 1 : count), 0) ?? 0,
				)
				.withTrainStation(0)
		})
		return objectives
	}

	private countFulfilledObjectiveCards(currentPlayer: Player, objectives: Objectives): number {
		const remainingObjectives = currentPlayer.discardedCards
			.concat(currentPlayer.cards)
			.filter((card) => card instanceof ObjectiveCard) as ObjectiveCard[]
		const allObjectives = currentPlayer.playedObjectives.concat(remainingObjectives)
		const allCombinationsOfObjectives = this.getAllCombinationsOfObjectives(allObjectives)
		if (allCombinationsOfObjectives.length === 0) {
			return 0
		}
		return allCombinationsOfObjectives.reduce((highestScore, objectivesCombo) => {
			const possibleObjectives = objectives.clone()
			const victoryPoints: number = objectivesCombo.reduce((victoryPoints, objectiveCard) => {
				const isFulfilled = possibleObjectives.fulfills(objectiveCard.objectives)
				if (isFulfilled) {
					possibleObjectives.subtract(objectiveCard.objectives)
				}
				return isFulfilled
					? victoryPoints + objectiveCard.victoryPointsFulfilled
					: victoryPoints + (objectiveCard.isOptional ? 0 : objectiveCard.victoryPointsUnfulfilled)
			}, 0)
			return victoryPoints > highestScore ? victoryPoints : highestScore
		}, -999)
	}

	private getAllCombinationsOfObjectives(allObjectives: ObjectiveCard[]) {
		const mandatoryObjectives = allObjectives.filter((objective) => !objective.isOptional)
		return getAllCombinations(allObjectives).filter((objectiveCards) => {
			return mandatoryObjectives.every((mandatoryObjective) => objectiveCards.includes(mandatoryObjective))
		})
	}
}

type ScoreCard = {
	coins: number
	buildings: number
	ships: number
	ports: number
	trainStations: number
	helpedFarmers: number
	cowCards: number
	fulfilledObjectiveCards: number
	stationMasters: number
	fifthAndSixthWorkers: number
	secondMovementUpgrade: number
	jobMarketToken: number
	total: number
}
