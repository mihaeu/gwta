import { NeutralBuilding } from "./neutralBuilding.js"
import { Option } from "../options/option.js"

export class NeutralBuildingF extends NeutralBuilding {
	options(): Option[] {
		return []
	}
}
