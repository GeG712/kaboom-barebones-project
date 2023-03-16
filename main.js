import kaboom from "kaboom";

kaboom({
  background: [0, 0, 0],
  width: 440,
  height: 275,
  scale: 1.5,
});

loadRoot("sprites/");
loadSprite("stars", "stars.png");
loadSprite("gem", "gem.png");
loadSprite("spaceship", "spaceship.png");
loadSprite("alien", "alien.png");

loadRoot("sounds/");
loadSound("shoot", "shoot.wav");
loadSound("score", "score.wav");
loadSound("music", "music.mp3");
loadSound("explosion", "explosion.wav");

scene("main", () => {
  layers(["bg", "obj", "ui"], "obj");

  add([sprite("stars"), layer("bg")]);

  // Game Parameters
const MAP_WIDTH = 440;
const MAP_HEIGHT = 275;
const BLOCK_SIZE = 11;

const map = addLevel(
  [
    "--------------------------------------------",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                pppppp    -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-   pppppp                                 -",
    "-                                          -",
    "-                                          -",
    "-                 pppppp                   -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "-                                          -",
    "============================================",
    "                                            ",
  ],
  {
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
    pos: vec2(0, 0),
    "=": () => [
      rect(BLOCK_SIZE, BLOCK_SIZE),
      color(150, 75, 0),
      "ground",
      area(),
      solid(),
    ],
    p: () => [
      rect(BLOCK_SIZE, BLOCK_SIZE),
      color(0, 0, 255),
      "platform",
      area(),
      solid(),
    ],
    "-": () => [
      rect(BLOCK_SIZE / 10, BLOCK_SIZE),
      color(0, 0, 0),
      "boundary",
      area(),
      solid(),
    ],
  }
);
});

go("main");