import { Option } from "../options/option.js"
import Player from "../player.js"
import GameBoard from "../gameBoard.js"
import { GainCoinOption } from "../options/gainCoinOption.js"
import { DrawCardOption } from "../options/drawCardOption.js"
import { FirstThanSecondsOption } from "../options/firstThanSecondOption.js"
import { DiscardCardOptions } from "./discardCardOptions.js"
import { Building } from "../buildings/building.js"
import { GainGrainOption } from "../options/gainGrainOption.js"
import { CompoundOption } from "../options/compoundOption.js"
import { CertificateOption } from "../options/certificateOption.js"
import { MoveTrainOptions } from "./moveTrainOptions.js"
import { RemoveCardOption } from "../options/removeCardOption.js"
import { AnyCard } from "../cards.js"

export class AuxiliaryActionOptions extends Option {
	constructor(building?: Building) {
		super()
		this._building = building
	}

	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		const options: Option[] = [new GainCoinOption(1), new FirstThanSecondsOption(new DrawCardOption(), new DiscardCardOptions())]

		if (currentPlayer.coins > 0) {
			options.push(new FirstThanSecondsOption(new GainCoinOption(-1), new GainGrainOption(1)))
			options.push(new FirstThanSecondsOption(new GainCoinOption(-1), new MoveTrainOptions(1)))
			options.push(new FirstThanSecondsOption(new GainCoinOption(-1), new RemoveCardOption(new AnyCard())))
		}

		if (currentPlayer.grain > 0) {
			options.push(new CompoundOption(new GainGrainOption(-1), new CertificateOption(1), new GainCoinOption(1)))
		}

		return options
	}
}
