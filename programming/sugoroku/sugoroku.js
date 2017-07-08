enchant();

function rand(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

window.onload = function() {
  var core = new Core(400,400);
  core.fps = 24;
  core.preload('title.png','bigdice.png','dice.png','masu.png','chara.png','messaging.png','ball.png');


  var blocks = [
    [0,0,4],
    [0,1,3],
    [0,2,3],
    [0,3,3],
    [0,4,3],
    [0,5,3],
    [1,5,3],
    [2,5,3],
    [3,5,3],
    [4,5,3],
    [5,5,3],
    [5,6,3],
    [5,7,3],
    [5,8,3],
    [5,9,3],
    [5,10,3],
    [5,11,3],
    [6,11,3],
    [6,12,1]
  ];

  var startScene = new Scene(400,400);
  var mainScene  = new Scene(400,400);
  var endScene   = new Scene(400,400);
  var player      = undefined;
  var gameManager = undefined;
  var grids = [];

  // フラグがグローバルになってまったorz
  var dicing = false;
  var isClear = false;


  core.keybind('Z'.charCodeAt(0), 'A');
  core.keybind(' '.charCodeAt(0), 'A');
  core.keybind('S'.charCodeAt(0), 'S');

  var Enemy = Class.create(Sprite, {
    initialize: function() {
      Sprite.call(this,20,20);
      this.image = core.assets['ball.png'];

      var direction = rand(0,3);
      var value = rand(0, 400);

      var vx = 0;
      var vy = 0;

      switch(direction) {
        case 0 :
          this.x = value;
          this.y = 0 - 100;
          vy = rand(1,8) + 1;
          vx = rand(1,5);
          break;
        case 1 :
          this.x = 390 + 100;
          this.y = value;
          vx = -rand(1,8) + 1;
          vy = rand(1,5);
          break;
        case 2 :
          this.x = value;
          this.y = 390 + 100;
          vy = -rand(1,8) + 1;
          vx = rand(1,5);
          break;
        case 3 :
          this.x = 0 - 100;
          this.y = value;
          vx = rand(1,8) + 1;
          vy = rand(1,5);
          break;
      }

      this.on('enterframe',function(){
        this.x += vx;
        this.y += vy;

        if(this.x <= -100 && this.x >= 500 && this.y <= -100 && this.y >= 500) {
          mainScene.removeChild(this);
          delete this;
        }

        if(this.within(player,20)) {
          gameManager.gameover();
        }
      });

      mainScene.addChild(this);
    }
  });

  var Dice = Class.create(Sprite,{
    initialize: function() {
      Sprite.call(this,32*4,32*4);
      this.image = core.assets['bigdice.png'];
      this.num = 0; // 1 ~ 6
      this.x = 5;
      this.y = 5;

      this.rolling = false;

      mainScene.addChild(this);

      this.on('enterframe', function() {
        if(this.rolling) {
          this.frame = core.frame % 6;
        }

        if(this.rolling && core.input.A ) {
          this.rolling = false;
          this.num   = this.rand();
          this.frame = this.num - 1;

          player.move(this.num);
        }
      });
    },
    rand: function() {
      return Math.floor( Math.random() * (6 - 2) ) + 1;
    },
    start: function() {
      this.rolling = true;
    }
  });

  var Grid = Class.create(Sprite,{
      initialize: function(x,y,num) {
        Sprite.call(this,48,48);
        this.x = x;
        this.y = y;
        this.image = core.assets['masu.png'];
        this.frame = num;

        mainScene.addChild(this);
      }
  });

  var Player = Class.create(Sprite,{
    initialize: function(x,y) {
      Sprite.call(this,48,48);
      this.x = x;
      this.y = y;
      this.nowGrid = 0;
      this.image = core.assets['chara.png'];

      mainScene.addChild(this);
    },
    move: function(num) {
      var x = 0;
      var reachX,reachY;
      for(var i = 0; i < num; i++) {
        //this.nowGrid = (this.nowGrid + 1) % grids.length;
        this.nowGrid ++;

        if(this.nowGrid  < grids.length) {
          reachX = grids[this.nowGrid].x - grids[this.nowGrid - 1].x;
          reachY = grids[this.nowGrid].y - grids[this.nowGrid - 1].y;
        } else {
          reachX = 0;
          reachY = 0;
        }

        this.tl
        .moveBy(reachX, reachY, 10)
        .delay(2)
        .exec(function(){
          x ++;

          console.log(this.nowGrid - num + x)
          if(this.nowGrid - num + x >= grids.length - 1) {
            console.log("クリアであります。")
            gameManager.clear();
          }

          if(x == num) {
            gameManager.startGame();
          }
        });
      }
    }
  });

  var Message = Class.create(Sprite, {
    initialize: function(){
      Sprite.call(this, 300, 60);
      this.image = core.assets['messaging.png'];
      this.x = 400 - 300 - 10;
      this.y = 5;
      mainScene.addChild(this);
    }
  });

  var GameManager = Class.create({
    initialize: function() {
      mainScene.backgroundColor = "rgb(200,255,200)";
      core.pushScene(mainScene);

      // ステージレイヤ
      var stage = new Group();
      stage.x = 0;
      stage.y = 0;
      mainScene.addChild(stage);

      // サイコロ作成
      var dice  = new Dice ();

      // プレイヤー作成
      for(var i = 0; i < blocks.length; i++) {
        grids.push(new Grid(blocks[i][0] * 60 + 100 , blocks[i][1] * 60 ,blocks[i][2]));
      }
      player = new Player(100,0);

      //メッセージボックス
      //var message = new Message();

      // グループ追加
      for(var i = 0; i < grids.length ; i++) {
        stage.addChild(grids[i]);
      }
      stage.addChild(player);

      // キャラ追従
      stage.on('enterframe',function() {
        stage.x = - player.x + 200;
        stage.y = - player.y + 200;
      });

      mainScene.on('enterframe', function() {

        //サイコロスタート
        if(dicing) {
          dice.start();
          dicing = false;
        }

        //敵襲来
        if(core.frame % 5 == 0) {
          var enemy = new Enemy();
          stage.addChild(enemy);
        }
      });
    },
    startGame: function() {
      dicing = true;
    },
    clear: function() {
      console.log("clear!");
      var scene = new Scene(400,400);
      var label = new Label("Game Clear");
      //scene.backgroundColor = 'red';
      label.color = 'rgba(255, 0, 0, 0.5)';
      label.font = "normal 28px 'serif, sans-serif";
      label.x = 140;
      label.y = 200 - 14;
      scene.addChild(label);
      core.pushScene(scene);
    },
    gameover: function() {
      console.log("gameover!");
      var scene = new Scene(400,400);
      var label = new Label("Game Over");
      //scene.backgroundColor = 'red';
      label.color = 'rgba(0, 0, 0, 0.5)';
      label.font = "normal 28px 'serif, sans-serif";
      label.x = 140;
      label.y = 200 - 14;
      scene.addChild(label);
      core.pushScene(scene);
    }
  });

  core.onload = function() {
    var startScene = new Scene(400,400);
    var title = new Sprite(400,400);
    title.image = core.assets['title.png'];
    title.on('enterframe',function(){
      if(core.input.S) {
        gameManager = new GameManager();
        gameManager.startGame();
      }
    });
    startScene.addChild(title);

    core.pushScene(startScene);

    // gameManager = new GameManager();
    // gameManager.startGame();
  }
  core.start();
}
