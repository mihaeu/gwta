import Engine from "./engine.js";
import Map from "./map.js";

const engine = new Engine();
while (!engine.isGameOver()) {
    const move = engine.moves().pop();
    engine.play(move!);
}
console.log('Game is over', engine.isGameOver());

const map = new Map();
console.log(map.start.childNodes().pop()!.nextNonEmptyDescendants());
console.log({
    greenFarmers: map.greenFarmers,
    blueFarmers: map.blueFarmers,
    orangeFarmers: map.orangeFarmers,
    yellowFarmers: map.yellowFarmers,
    jobMarket: map.jobMarket,
    foresightSpace: map.foresightSpaces,
})
