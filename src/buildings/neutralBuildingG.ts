import { NeutralBuilding } from "./neutralBuilding.js"
import { DoubleAuxiliaryOptions } from "../actions/doubleAuxiliaryOptions.js"
import { MoveTrainOptions } from "../actions/moveTrainOptions.js"
import { Option } from "../options/option.js"

export class NeutralBuildingG extends NeutralBuilding {
	options(): Option[] {
		return [new MoveTrainOptions(), new DoubleAuxiliaryOptions()]
	}
}
