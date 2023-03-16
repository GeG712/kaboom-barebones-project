kaboom();

loadSprite("mole", "assets/mole.png");
loadSprite("bg", "assets/bg.jpg");

scene("start", () => {
  add([pos(0, 0), color(0, 0, 255), rect(width(), height())]);

  add([
    "startGame",
    text("Click here to start", { size: 60 }),
    pos(width() / 2 - 400, height() / 2 - 100),
    area(),
  ]);
  onClick("startGame", () => {
    go("game");
  });
});

go("start");

scene("game", () => {
  add([sprite("bg", { width: width(), height: height() })]);

  const score = add([
    text("Score: 0"),
    pos(50, 50),
    color(0, 0, 255),
    { value: 0 },
    timer(3, () => {
      go("gameover", score.value);
    }),
  ]);

  function spawnMoles(x, y) {
    add([
      "mole",
      sprite("mole", { width: 200 }),
      pos(x, y),
      area(),
      lifespan(rand(2, 4)),
    ]);
  }

  loop(1, () => {
    let xPos = rand(1, 26) * 50;
    let yPos = rand(2, 9) * 50;
    spawnMoles(xPos, yPos);
  });

  onClick("mole", (mole) => {
    mole.destroy();
    score.value += 1;
    score.text = "Score: " + score.value;
  });
});

scene("gameover", (score) => {
  add([rect(width(), height()), color(0, 153, 51)]);

  add([pos(100, 50), text("Game Over!", { size: 60 })]);

  add([pos(100, 100), text("Your score was: " + score, { size: 60 })]);

  add([
    "restart",
    pos(100, 250),
    color(255, 255, 204),
    text("Click here to try again", { size: 80 }),
    area(),
  ]);

  onClick("restart", () => {
    go("game");
  });
});
