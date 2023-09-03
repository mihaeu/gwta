import { AuxiliaryActionOptions } from "../actions/auxiliaryActionOptions.js"
import { NeutralBuilding } from "./neutralBuilding.js"
import { Option } from "../options/option.js"

export class NeutralBuildingH extends NeutralBuilding {
	options(): Option[] {
		return [new AuxiliaryActionOptions()]
	}
}
