import RandomPlayer from "./randomplayer.js"
import { Start } from "./nodes.js"
import { Carpenter } from "./tiles.js"

test("Ensure worker is removed from job market and added to player board", () => {
	const testPlayer = new RandomPlayer("Test", new Start(), [], [])
	testPlayer.hireWorker(new Carpenter())
	expect(testPlayer.carpenters).toHaveLength(2)
})
