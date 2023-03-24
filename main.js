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
      //patrol(10000),
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
      //patrol(50),
      //enemy(),
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