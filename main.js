kaboom({
  background: [134, 135, 247],
  width: 320,
  height: 240,
  scale: 2.5,
});

//test

loadRoot("sprites/");
loadAseprite("mario", "Mario.png", "Mario.json");
loadAseprite("enemies", "enemies.png", "enemies.json");
loadSprite("ground", "ground.png");
loadSprite("questionBox", "questionBox.png");
loadSprite("emptyBox", "emptyBox.png");
loadSprite("brick", "brick.png");
loadSprite("coin", "coin.png");
loadSprite("bigMushy", "bigMushy.png");
loadSprite("pipeTop", "pipeTop.png");
loadSprite("pipeBottom", "pipeBottom.png");
loadSprite("shrubbery", "shrubbery.png");
loadSprite("hill", "hill.png");
loadSprite("cloud", "cloud.png");
loadSprite("castle", "castle.png");

const LEVELS = [
  [
    "                                                                                                ",
    "                                                                                                ",
    "                                                                                                ",
    "                                                                                                ",
    "                                                                                                ",
    "                                                                                                ",
    "                                                                                                ",
    "      -?-b-                                                                                     ",
    "                                                    ?        ?                                  ",
    "                                                                                                ",
    "                                      _                 ?                                       ",
    "                                 _    |                                                         ",
    "                           _     |    |                _                                        ",
    "       E                   |     |    |   E   E        |                            H           ",
    "================     ===========================================================================",
    "================     ===========================================================================",
  ],
  [
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                       ?                                                     ",
    "                                                                                             ",
    "                                   -?-                                                       ",
    "                                                                                             ",
    "      -?-b-                  -?-                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "       _                                            _                                        ",
    "       |                                            |          E    E            H           ",
    "================     ========================================================================",
    "================     ========================================================================",
  ],
];

const levelConf = {
  // grid size
  width: 16,
  height: 16,
  pos: vec2(0, 0),
  // define each object as a list of components
  "=": () => [sprite("ground"), area(), solid(), origin("bot"), "ground"],
  "-": () => [sprite("brick"), area(), solid(), origin("bot"), "brick"],
  H: () => [
    sprite("castle"),
    area({ width: 1, height: 240 }),
    origin("bot"),
    "castle",
  ],
  "?": () => [
    sprite("questionBox"),
    area(),
    solid(),
    origin("bot"),
    "questionBox",
    "coinBox",
  ],
  b: () => [
    sprite("questionBox"),
    area(),
    solid(),
    origin("bot"),
    "questionBox",
    "mushyBox",
  ],
  "!": () => [
    sprite("emptyBox"),
    area(),
    solid(),
    // bump(),
    origin("bot"),
    "emptyBox",
  ],
  c: () => [
    sprite("coin"),
    area(),
    solid(),
    //bump(64, 8),
    cleanup(),
    lifespan(0.4, { fade: 0.01 }),
    origin("bot"),
    "coin",
  ],
  M: () => [
    sprite("bigMushy"),
    area(),
    solid(),
    patrol(10000),
    body(),
    cleanup(),
    origin("bot"),
    "bigMushy",
  ],
  "|": () => [sprite("pipeBottom"), area(), solid(), origin("bot"), "pipe"],
  _: () => [sprite("pipeTop"), area(), solid(), origin("bot"), "pipe"],
  E: () => [
    sprite("enemies", { anim: "Walking" }),
    area({ width: 16, height: 16 }),
    solid(),
    body(),
    patrol(50),
    enemy(),
    origin("bot"),
    "badGuy",
  ],
  p: () => [
    sprite("mario", { frame: 0 }),
    area({ width: 16, height: 16 }),
    body(),
    //mario(),
    //bump(150, 20, false),
    origin("bot"),
    "player",
  ],
};

scene("start", () => {
  add([
    text("Press enter to start", { size: 24 }),
    pos(vec2(160, 120)),
    origin("center"),
    color(255, 255, 255),
  ]);

  onKeyRelease("enter", () => {
    go("game");
  });
});

go("start");

scene("game", (levelNumber = 0) => {
  layers(["bg", "game", "ui"], "game");

  const level = addLevel(LEVELS[levelNumber], levelConf);

  add([sprite("cloud"), pos(20, 50), layer("bg")]);

  add([sprite("hill"), pos(32, 208), layer("bg"), origin("bot")]);

  add([sprite("shrubbery"), pos(200, 208), layer("bg"), origin("bot")]);
 
  add([
    text("Level " + (levelNumber + 1), { size: 24 }),
    pos(vec2(160, 120)),
    color(255, 255, 255),
    origin("center"),
    layer("ui"),
    lifespan(1, { fade: 0.5 }),
  ]);

  const player = level.spawn("p", 1, 10);

  const SPEED = 120;

  onKeyDown("right", () => {
    player.flipX(false);
    player.move(SPEED, 0);
  });
  
  onKeyDown("left", () => {
    player.flipX(true);
    if (toScreen(player.pos).x > 20) {
      player.move(-SPEED, 0);
    }
  });
  
  onKeyPress("space", () => {
    if (player.grounded()) {
      player.jump();
      canSquash = true;
    }
  });

  player.onUpdate(() => {
    // center camera to player
    var currCam = camPos();
    if (currCam.x < player.pos.x) {
      camPos(player.pos.x, currCam.y);
    }
    if (player.grounded()) {
      canSquash = false;
    }
  });

  let canSquash = false;

  player.onCollide("badGuy", (baddy) => {
    if (baddy.isAlive == false) return;
    if (canSquash) {
      // Mario has jumped on the bad guy:
      baddy.squash();
    } else {
      // Mario has been hurt. Add logic here later...
    }
  });

});

function patrol(distance = 100, speed = 50, dir = 1) {
  return {
    id: "patrol",
    require: ["pos", "area"],
    startingPos: vec2(0, 0),
    add() {
      this.startingPos = this.pos;
      this.on("collide", (obj, side) => {
        if (side === "left" || side === "right") {
          dir = -dir;
        }
      });
    },
    update() {
      if (Math.abs(this.pos.x - this.startingPos.x) >= distance) {
        dir = -dir;
      }
      this.move(speed * dir, 0);
    },
  };
}

function enemy() {
  return {
    id: "enemy",
    require: ["pos", "area", "sprite", "patrol"],
    isAlive: true,
    update() {},
    squash() {
      this.isAlive = false;
      this.unuse("patrol");
      this.stop();
      this.frame = 2;
      this.area.width = 16;
      this.area.height = 8;
      this.use(lifespan(0.5, { fade: 0.1 }));
    },
  };
}