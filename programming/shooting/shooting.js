 enchant();

var WIDTH  = 240;
var HEIGHT = 400;
var score = 0;

function rand(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

var blocks =
[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

window.onload = function() {
  var core = new Core(WIDTH,HEIGHT);
  var shots  = [];
  var eShots = [];
  core.fps = 60;
  core.preload('player.png','map.png','shot.png','enemy.png');
  core.keybind('Z'.charCodeAt(0), 'A');
  core.keybind('X'.charCodeAt(0), 'B');

  var Player = Class.create(Sprite,{
      initialize: function() {
          Sprite.call(this,32,32);

          this.image = core.assets['player.png'];

          this.x = (WIDTH - 32) / 2;
          this.y = HEIGHT - 32;

          this.on('enterframe', function() {
            var d = 3;
            if(core.input.B) {
              d = 2 ;
            } else {
              d = 3 ;
            }

            if(core.input.left  && this.x >= 0 )            this.x -= d;
            if(core.input.right && this.x <= WIDTH - 32 )   this.x += d;
            if(core.input.up    && this.y >= 0 )            this.y -= d;
            if(core.input.down  && this.y <= HEIGHT - 32 )  this.y += d;

            // if(this.x + 5 >= WIDTH || this.x + 5 <= 0 || this.y <= 0 || this.y >= HEIGHT) {
            //   d = -5;
            // } else {
            //   if(core.input.left)  this.x -= d;
            //   if(core.input.right) this.x += d;
            //   if(core.input.up)    this.y -= d;
            //   if(core.input.down)  this.y += d;
            // }

            if(core.input.A) {
              shots[this.age] = ( new Shot(this.x, this.y, this.age));
            }


          });
      }
  });

  var Enemy = Class.create(Sprite, {
    initialize: function(player) {
        Sprite.call(this,20,20);

        this.image = core.assets['enemy.png'];

        this.x = rand(0,WIDTH);
        this.y = 0 ;
        this.hp = 2;

        this.on('enterframe',function() {
          this.x = this.x +  Math.sin( ((this.age % 360) / 40 ) * Math.PI);
          this.y = this.age;

          if(this.y >= HEIGHT) {
            core.rootScene.removeChild(this);
            delete this;
          }

          if(this.within(player,20) ){
            console.log("game over");
          };

          for(key in shots) {
            if(this.within(shots[key], 10)) {
              this.hp -= 1;
            }

            if(this.hp <= 0) {
              core.rootScene.removeChild(this);
              delete this;
              score += 1 ;
            }
          }

          if(this.age % 20 == 0) {
            eShots[this.age] = (new EnemyShot(this.x, this.y, player, this.age));
          }


        });

        core.rootScene.addChild(this);
    }
  });

  var EnemyShot = Class.create(Sprite, {
    initialize: function(x,y,player,id) {
      Sprite.call(this,2,5);
      this.image = core.assets['shot.png'];
      this.x = x + 10;
      this.y = y ;
      this.id = id;
      this.frame = 3;

      this.on('enterframe', function() {
        this.x = (x + 10) + Math.sin( ((this.age % 360) / 100 ) * Math.PI);
        this.y += 3;
        if(this.y > HEIGHT) {
          core.rootScene.removeChild(this);
          delete eShots[this.id];
        }

        if(this.within(player,10)) {
          console.log("game over");

          var scene = new Scene(240,400);
          var label = new Label("Game Over");
          label.color = 'rgba(255, 255, 255, 0.5)';
          label.font = "normal 36px 'serif, sans-serif";
          label.x = 30;
          label.y = HEIGHT / 2 - 18;;


          scene.addChild(label);
          core.pushScene(scene);
        }
      });



      core.rootScene.addChild(this);
      delete eShots[this.id];
    }
  })

  var Shot = Class.create(Sprite,{
    initialize: function(x,y,id) {
      Sprite.call(this,2,2);
      this.image = core.assets['shot.png'];
      this.x = x + 16;
      this.y = y ;
      this.id = id;

      this.on('enterframe', function() {
        this.frame = core.frame % 5;
        this.y -= 10;
        if(this.y < 0) {
          core.rootScene.removeChild(this);
          delete shots[this.id]
        }
      });

      core.rootScene.addChild(this);
    }
  });

  core.onload = function() {
    var player = new Player(32,32);

    var map = new Map(16,16);
    map.image = core.assets['map.png'];
    map.loadData(blocks);

    var scoreLabel = new Label('SCORE:'+ score);
    scoreLabel.color = 'rgba(255, 255, 255, 0.5)';
    scoreLabel.font = "normal 20px 'serif, sans-serif";

    var stage = new Group();
    stage.addChild(map);
    stage.addChild(player);
    stage.y = 0;
    stage.on('enterframe', function() {
      var mapLength = blocks.length * 16;

      stage.y = ( - mapLength + HEIGHT ) +  core.frame % (-mapLength + HEIGHT);

      if(core.frame % 30 == 0) {
        var enemy = new Enemy(player);
      }

      scoreLabel.text = "SCORE:" + score;

      if(score > 2000) {
        var scene = new Scene(240,400);
        var label = new Label("Game Clear");
        label.color = 'rgba(255, 255, 0, 0.5)';
        label.font = "normal 36px 'serif, sans-serif";
        label.x = 20;
        label.y = HEIGHT / 2 - 18;;


        scene.addChild(label);
        core.pushScene(scene);

      }
    });

    core.rootScene.addChild(stage);
    core.rootScene.addChild(player);
    core.rootScene.addChild(scoreLabel);
  }
  core.start();
}
