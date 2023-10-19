export class Objectives {
	constructor(
		public northPort: number = 0,
		public eastPort: number = 0,
		public southPort: number = 0,
		public westPort: number = 0,
		public caracu: number = 0,
		public franqueiro: number = 0,
		public aberdeenAngus: number = 0,
		public value3Cow: number = 0,
		public blueFarmer: number = 0,
		public yellowFarmer: number = 0,
		public orangeFarmer: number = 0,
		public greenFarmer: number = 0,
		public building: number = 0,
		public value18Ship: number = 0,
		public trainStation: number = 0,
	) {}

	fulfills(other: Objectives) {
		return (
			this.northPort >= other.northPort &&
			this.eastPort >= other.eastPort &&
			this.southPort >= other.southPort &&
			this.westPort >= other.westPort &&
			this.caracu >= other.caracu &&
			this.franqueiro >= other.franqueiro &&
			this.aberdeenAngus >= other.aberdeenAngus &&
			this.value3Cow >= other.value3Cow &&
			this.blueFarmer >= other.blueFarmer &&
			this.yellowFarmer >= other.yellowFarmer &&
			this.orangeFarmer >= other.orangeFarmer &&
			this.greenFarmer >= other.greenFarmer &&
			this.building >= other.building &&
			this.value18Ship >= other.value18Ship &&
			this.trainStation >= other.trainStation
		)
	}

	subtract(other: Objectives) {
		this.northPort -= other.northPort
		this.eastPort -= other.eastPort
		this.southPort -= other.southPort
		this.westPort -= other.westPort
		this.caracu -= other.caracu
		this.franqueiro -= other.franqueiro
		this.aberdeenAngus -= other.aberdeenAngus
		this.value3Cow -= other.value3Cow
		this.blueFarmer -= other.blueFarmer
		this.yellowFarmer -= other.yellowFarmer
		this.orangeFarmer -= other.orangeFarmer
		this.greenFarmer -= other.greenFarmer
		this.building -= other.building
		this.value18Ship -= other.value18Ship
		this.trainStation -= other.trainStation
	}

	clone(): Objectives {
		return new Objectives()
			.withNorthPort(this.northPort)
			.withEastPort(this.eastPort)
			.withSouthPort(this.southPort)
			.withWestPort(this.westPort)
			.withCaracu(this.caracu)
			.withFranqueiro(this.franqueiro)
			.withAberdeenAngus(this.aberdeenAngus)
			.withValue3Cow(this.value3Cow)
			.withBlueFarmer(this.blueFarmer)
			.withYellowFarmer(this.yellowFarmer)
			.withOrangeFarmer(this.orangeFarmer)
			.withGreenFarmer(this.greenFarmer)
			.withBuilding(this.building)
			.withValue18Ship(this.value18Ship)
			.withTrainStation(this.trainStation)
	}

	withNorthPort(count: number) {
		this.northPort = count
		return this
	}

	withEastPort(count: number) {
		this.eastPort = count
		return this
	}

	withSouthPort(count: number) {
		this.southPort = count
		return this
	}

	withWestPort(count: number) {
		this.westPort = count
		return this
	}

	withCaracu(count: number) {
		this.caracu = count
		return this
	}

	withFranqueiro(count: number) {
		this.franqueiro = count
		return this
	}

	withAberdeenAngus(count: number) {
		this.aberdeenAngus = count
		return this
	}

	withValue3Cow(count: number) {
		this.value3Cow = count
		return this
	}

	withBlueFarmer(count: number) {
		this.blueFarmer = count
		return this
	}

	withYellowFarmer(count: number) {
		this.yellowFarmer = count
		return this
	}

	withOrangeFarmer(count: number) {
		this.orangeFarmer = count
		return this
	}

	withGreenFarmer(count: number) {
		this.greenFarmer = count
		return this
	}

	withBuilding(count: number) {
		this.building = count
		return this
	}

	withValue18Ship(count: number) {
		this.value18Ship = count
		return this
	}

	withTrainStation(count: number) {
		this.trainStation = count
		return this
	}

	toString() {
		const toPrint: any = {}
		this.northPort > 0 && (toPrint.northPort = this.northPort)
		this.eastPort > 0 && (toPrint.eastPort = this.eastPort)
		this.southPort > 0 && (toPrint.southPort = this.southPort)
		this.westPort > 0 && (toPrint.westPort = this.westPort)
		this.caracu > 0 && (toPrint.caracu = this.caracu)
		this.franqueiro > 0 && (toPrint.franqueiro = this.franqueiro)
		this.aberdeenAngus > 0 && (toPrint.aberdeenAngus = this.aberdeenAngus)
		this.value3Cow > 0 && (toPrint.value3Cow = this.value3Cow)
		this.blueFarmer > 0 && (toPrint.blueFarmer = this.blueFarmer)
		this.yellowFarmer > 0 && (toPrint.yellowFarmer = this.yellowFarmer)
		this.orangeFarmer > 0 && (toPrint.orangeFarmer = this.orangeFarmer)
		this.greenFarmer > 0 && (toPrint.greenFarmer = this.greenFarmer)
		this.building > 0 && (toPrint.building = this.building)
		this.value18Ship > 0 && (toPrint.value18Ship = this.value18Ship)
		this.trainStation > 0 && (toPrint.trainStation = this.trainStation)
		return JSON.stringify(toPrint, null, 2)
	}
}
