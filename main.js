 kaboom({
  background: [134, 135, 247],
  width: 512,
  height: 258,
  scale: 2.5,
});

loadRoot("sprites/");
loadAseprite("mario", "Mario.png", "Mario.json");
loadAseprite("enemies", "enemies.png", "enemies.json");
loadSprite("ground", "stone.jpg");
loadSprite("questionBox", "luckyblock.png");
loadSprite("emptyBox", "emptyBox.png");
loadSprite("brick", "brick.png");
loadSprite("coin", "Bitcoin.png");
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
    "                                                       -?-                                      ",
    "                                      _                                                        ",
    "                                 _    |                               _                         ",
    "                           _     |    |                _              |                          ",
    "       E                   |     |    |       E        |       E      |              H           ",
    "================     ===========================================================================",
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
    "                                                                 _                           ",
    "                                                                 |                           ",
    "       _                                           _             |                           ",
    "       |                        E                  |             |          E          H     ",
    "================     ========================================================================",
    "================     ========================================================================",
    "================     ========================================================================",
  ],

  [
    "                                         _                                                                                        ",
    "                                         |                                                                                        ",
    "                                         |                                                                                       ",
    "                                       ----                        -?-?-                                                          ",
    "                                                                                                                                  ",
    "                                   -?-                                                         E                                  ",
    "                                                                                  -?-     ---------                               ",
    "      -?-b-                  -?-                    --b-                                                                   H      ",
    "                                                                                                                        --------  ",
    "                                                                 --?-?--                                                          ",
    "                                                                                    _                                             ",
    "                                                                                    |                         ----                ",
    "       _                                            _                               |                                             ",
    "       |                           E        E       |          E    E               |          E                                  ",
    "================     =================================================================================================            ",
    "================     =================================================================================================            ",
    "================     =================================================================================================            ",
  ],

  [
    "                                                                                                       |                                        ",
    "                                                                                                       |                                        ",
    "                                                                                                -----------                                     ",
    "                                                                                                                                                ",
    "                                                                                           _                                                    ",
    "                                                                                           |                                                    ",
    "                                                                     ---           --    -------                                                ",
    "      -?-b-                                                                  ----                                                               ",
    "                                                          ------                                                                                ",
    "                                                                                                                                                ", 
    "                                      _                                                               --b--                                    ",
    "                                 _    |                                                       _                      _                          ",
    "                           _     |    |                _             _                        |                      |                          ",
    "        E                  |     |    |   E   E        |             |           E            |          E           |               H          ",
    "================     =========================================      =====================     |      ===========================================",
    "================     =========================================      =====================     |      ========================================== ",
    "================     =========================================      =====================     |      ========================================== ",
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
    bump(),
    origin("bot"),
    "emptyBox",
  ],
  c: () => [
    sprite("coin"),
    area({with: 16, height: 16}),
    solid(),
    bump(64, 8),
    cleanup(),
    lifespan(0.1, { fade: 0.01 }),
    origin("bot"),
    "coin",
  ],



  C: () => [
    sprite("coin"),
    area({with: 16, height: 16}),
    solid(),
    bump(64, 8),
    cleanup(),
    origin("bot"),
    "coin",
  ],


  M: () => [
    sprite("bigMushy"),
    area(),
    solid(),
    patrol(5000000),
    body(),
    enemy(),
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
  EN: () => [
    sprite("enemies", { anim: "Walking" }),
    area({ width: 32, height: 32 }),
    solid(),
    body(),
    patrol(40),
    enemy(),
    origin("bot"),
    "badGuy",
  ],

  p: () => [
    sprite("mario", { frame: 0 }),
    area({ width: 16, height: 16 }),
    body(),
    mario(),
    bump(150, 20, false),
    origin("bot"),
    "player",
  ],
};
 
scene("credits", () => {
  add([
    text("Creators:", { size: 24 }),
    pos(vec2(256, 48)),
    origin("center"),
    color(255, 255, 255),
  ]);

  add([

    text("Aryan, Fabian, Gianluca, Sven" , { size: 24 }),
   
    pos(vec2(256, 96)),
    origin("center"),
    color(255,100,50),

  ]);

  add([

    text("use arrow keys to move and space to Jump" , { size: 16 }),
   
    pos(vec2(256, 126)),
    origin("center"),
    color(255,100,50),

  ]);


  add([
    text("Press backspace to", { size: 24 }),
    pos(vec2(256, 154)),
    origin("center"),
    color(100,100,255),
  ]);

  add([
    text("return to the start menu", { size: 24 }),
    pos(vec2(256, 202)),
    origin("center"),
    color(100,100,255),
  ]);

  onKeyRelease("backspace", () => {
    go("start");
  });

});


scene("start", () => {
  add([
    text("Press enter to start", { size: 24 }),
    pos(vec2(256, 48)),
    origin("center"),
    color(255, 255, 255),
  ]);

  add([
    text("Press C to see contributors and Controls", { size: 16 }),
    pos(vec2(256, 192)),
    origin("center"),
    color(255, 255, 255),
  ]);

  onKeyRelease("c", () => {
    go("credits");
  });

  onKeyRelease("enter", () => {
    go("game");
  });

});

go("start");

scene("game", (levelNumber = 0) => {
  layers(["bg", "game", "ui"], "game");

  const level = addLevel(LEVELS[levelNumber], levelConf);





  add([sprite("shrubbery"), pos(200, 208), layer("bg"), origin("bot")]);
  add([sprite("shrubbery"), pos(540, 208), layer("bg"), origin("bot")]);
  add([sprite("shrubbery"), pos(740, 208), layer("bg"), origin("bot")]);
  add([sprite("shrubbery"), pos(820, 208), layer("bg"), origin("bot")]);
  add([sprite("shrubbery"), pos(960, 208), layer("bg"), origin("bot")]);
  add([sprite("shrubbery"), pos(1230, 208), layer("bg"), origin("bot")]);

  add([sprite("cloud"), pos(500, 40), layer("bg")]);
  add([sprite("cloud"), pos(700, 45), layer("bg")]);  
  add([sprite("cloud"), pos(1060, 35), layer("bg")]);
  add([sprite("cloud"), pos(20, 50), layer("bg")]);
  add([sprite("cloud"), pos(360, 50), layer("bg")]);
 
  add([sprite("hill"), pos(640, 208), layer("bg"), origin("bot")]);
  add([sprite("hill"), pos(900, 208), layer("bg"), origin("bot")]);
  add([sprite("hill"), pos(1150, 208), layer("bg"), origin("bot")]);
  add([sprite("hill"), pos(32, 208), layer("bg"), origin("bot")]);
  add([sprite("hill"), pos(400, 208), layer("bg"), origin("bot")]);



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
    if (player.isFrozen) return;
    player.flipX(false);
    player.move(SPEED, 0);
  });
  
  onKeyDown("left", () => {
    if (player.isFrozen) return;
    player.flipX(true);
    if (toScreen(player.pos).x > 20) {
      player.move(-SPEED, 0);
    }
  });
  
  onKeyPress("space", () => {
    if (player.isAlive && player.grounded()) {
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
  
    if (player.isAlive && player.grounded()) {
      canSquash = false;
    }
  
    // Check if Mario has fallen off the screen
    if (player.pos.y > height() - 16) {
      killed();
    }
  });

  let canSquash = false;

  player.onCollide("badGuy", (baddy) => {
    if (baddy.isAlive == false) return;
    if (player.isAlive == false) return;
    if (canSquash) {
      // Mario has jumped on the bad guy:
      baddy.squash();
    } else {
      // Mario has been hurt
      if (player.isBig) {
        player.smaller();
      } else {
        // Mario is dead :(
        killed();
      }
    }
  });

  player.on("headbutt", (obj) => {
    if (obj.is("questionBox")) {
      if (obj.is("coinBox")) {
        let coin = level.spawn("c", obj.gridPos.sub(0, 1));
        coin.bump();
      } else if (obj.is("mushyBox")) {
        level.spawn("M", obj.gridPos.sub(0, 1));
      }
      var pos = obj.gridPos;
      destroy(obj);
      var box = level.spawn("!", pos);
      box.bump();
    }
  });

  player.onCollide("bigMushy", (mushy) => {
    destroy(mushy);
    player.bigger();
  });

  function killed() {
    // Mario is dead :(
    if (player.isAlive == false) return; // Don't run it if mario is already dead
    player.die();
    add([
      text("Game Over :(", { size: 24 }),
      pos(toWorld(vec2(160, 120))),
      color(255, 255, 255),
      origin("center"),
      layer("ui"),
    ]);
    wait(2, () => {
   go("start");
    });
  }

  player.onCollide("castle", (castle, side) => {
    player.freeze();
    add([
      text("Well Done!", { size: 24 }),
      pos(toWorld(vec2(160, 120))),
      color(255, 255, 255),
      origin("center"),
      layer("ui"),
    ]);
    wait(1, () => {
      let nextLevel = levelNumber + 1;
  
      if (nextLevel >= LEVELS.length) {
        go("start");
      } else {
        go("game", nextLevel);
      }
    });
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

function bump(offset = 8, speed = 2, stopAtOrigin = true) {
  return {
    id: "bump",
    require: ["pos"],
    bumpOffset: offset,
    speed: speed,
    bumped: false,
    origPos: 0,
    direction: -1,
    update() {
      if (this.bumped) {
        this.pos.y = this.pos.y + this.direction * this.speed;
        if (this.pos.y < this.origPos - this.bumpOffset) {
          this.direction = 1;
        }
        if (stopAtOrigin && this.pos.y >= this.origPos) {
          this.bumped = false;
          this.pos.y = this.origPos;
          this.direction = -1;
        }
      }
    },
    bump() {
      this.bumped = true;
      this.origPos = this.pos.y;
    },
  };
}

function mario() {
  return {
    id: "mario",
    require: ["body", "area", "sprite", "bump"],
    smallAnimation: "Running",
    bigAnimation: "RunningBig",
    smallStopFrame: 0,
    bigStopFrame: 8,
    smallJumpFrame: 5,
    bigJumpFrame: 13,
    isBig: false,
    isFrozen: false,
    isAlive: true,
    update() {
      if (this.isFrozen) {
        this.standing();
        return;
      }

      if (!this.grounded()) {
        this.jumping();
      } else {
        if (keyIsDown("left") || keyIsDown("right")) {
          this.running();
        } else {
          this.standing();
        }
      }
    },
    bigger() {
      this.isBig = true;
      this.area.width = 24;
      this.area.height = 32;
    },
    smaller() {
      this.isBig = false;
      this.area.width = 16;
      this.area.height = 16;
    },
    standing() {
      this.stop();
      this.frame = this.isBig ? this.bigStopFrame : this.smallStopFrame;
    },
    jumping() {
      this.stop();
      this.frame = this.isBig ? this.bigJumpFrame : this.smallJumpFrame;
    },
    running() {
      const animation = this.isBig ? this.bigAnimation : this.smallAnimation;
      if (this.curAnim() !== animation) {
        this.play(animation);
      }
    },
    freeze() {
      this.isFrozen = true;
    },
    die() {
      this.unuse("body");
      this.bump();
      this.isAlive = false;
      this.freeze();
      this.use(lifespan(1, { fade: 1 }));
    },
  };
}

