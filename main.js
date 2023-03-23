kaboom()

loadSprite("amog", "assets/amog.jpg");
loadSprite("bg", "assets/download.jpeg");

const player = add([
  sprite("amog"),  // renders as a sprite
  pos(120, 80),    // position in world
  area(),          // has a collider
  body(),          // responds to physics and gravity
])
