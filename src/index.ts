import Engine from "./engine.js";

const engine = new Engine();
while (!engine.isGameOver()) {
    const move = engine.moves().pop();
    engine.play(move!);
}
console.log('Game is over', engine.isGameOver());

