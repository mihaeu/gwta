import Player from "../player.js"
import { Option } from "../options/option.js"

export type PortSpace = {
	victoryPoints: number
	reward?: Option
	player?: Player
}

export type PortDistrict = {
	cost: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	spaces: PortSpace[]
}

export type Port = {
	portOne: Player[]
	portTwo?: Player[]
	portTwoDiscount?: 2 | 3
	west: PortDistrict
	north: PortDistrict
	east: PortDistrict
	south: PortDistrict
}
