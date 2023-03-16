kaboom()

loadSprite("mole", "assets/mole.jpg");
loadSprite("bg", "assets/download.jpeg");

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