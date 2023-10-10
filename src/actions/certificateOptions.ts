import GameBoard from "../gameBoard.js"
import Player from "../player.js"
import { Option } from "../options/option.js"
import { CertificateOption } from "../options/certificateOption.js"

export class CertificateOptions extends Option {
	resolve(gameBoard: GameBoard, currentPlayer: Player): Option[] {
		return currentPlayer.certificates <= 4
			? [0, 1, 2, 3, 4]
					.filter((count) => count <= currentPlayer.certificates)
					.map((count) => new CertificateOption(count > 0 ? -1 * count : 0))
			: [0, 2, 3, 4, 5, 6].map((count) => new CertificateOption(count > 0 ? -1 * count : 0))
	}
}
