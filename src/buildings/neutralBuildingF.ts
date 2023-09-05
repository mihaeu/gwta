import { NeutralBuilding } from "./neutralBuilding.js"
import { Option } from "../options/option.js"
import { CertificateOption } from "../options/certificateOption.js"
import { HelpFarmerOptions } from "../actions/helpFarmerOptions.js"
import GameBoard from "../gameBoard.js"
import Player from "../player.js"

export class NeutralBuildingF extends NeutralBuilding {
	options(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const farmerOptions = new HelpFarmerOptions(0).resolve(gameBoard, currentPlayer)
		return farmerOptions.length > 0 ? [new CertificateOption(1), new HelpFarmerOptions(0)] : [new CertificateOption(1)]
	}
}
