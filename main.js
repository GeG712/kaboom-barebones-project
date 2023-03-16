kaboom()

loadSprite("mole", "assets/mole.jpg");
loadSprite("bg", "assets/download.jpeg");

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

kaboom({
  width: 320,
  height: 240,
  font: "sinko",
  background: [ 0, 255, 255, ],
})

const player = add([
  sprite("mole"),  // renders as a sprite
  pos(120, 80),    // position in world
  area(),          // has a collider
  body(),          // responds to physics and gravity
])

// jump when player presses "space" key
onKeyPress("space", () => {
  // .jump() is provided by the body() component
  player.jump()
})