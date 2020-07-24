class Game {
    constructor(){
        // Setup Canvas
        this.canvas = document.getElementById("GameCanvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set Context
        this.context = this.canvas.getContext('2d');
        // Events
        this.GameOver = this.GameOver.bind(this);
        this.LevelOver = this.LevelOver.bind(this);
        document.addEventListener('GameOver', this.GameOver, false);
        document.addEventListener('LevelOver', this.LevelOver, false);
        this.keyPresses = {};
        this.mouse;
        this.KeyDownHandler = this.KeyDownHandler.bind(this);
        this.KeyUpHandler = this.KeyUpHandler.bind(this);
        this.MouseHandler = this.MouseHandler.bind(this);
        window.addEventListener('keydown', this.KeyDownHandler, false);
        window.addEventListener('keyup', this.KeyUpHandler, false);
        window.addEventListener('mousedown', this.MouseHandler, false);
        window.addEventListener('mouseup', this.MouseHandler, false);
        window.addEventListener('mousemove', this.MouseHandler, false);
        // Music
        this.musicManager = new MusicManager();
        // Physics
        this.physics = new PhysicsManager();
        // Setup Levels
        this.timeSplit = 0;
        this.lastTimeStamp = 0;
        this.gravity = 10;
        this.levels = [];
        this.player = new Bear(10, this.canvas.height-150, 50, 100, 10);
        this.gameObjects = [this.player, new Border(0, this.canvas.height - 50, this.canvas.width, 50), new Border(-50, 0, 50, this.canvas.height), new Border(this.canvas.width, 0, 50, this.canvas.height), new Border(0, -50, this.canvas.width, 50)]
       // this.currentLevel = this.levels[0];
    }

    // Starts game loop
    Start(){
        this.GameLoop(0);
    }

    GameLoop(timestamp){
        window.requestAnimationFrame(this.GameLoop);
        this.timeSplit = timestamp - this.lastTimeStamp;
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.UserInput();
        this.gameObjects.forEach(gameObject => {
            // Apply Physics
            this.PhysicsManager.ApplyPhysics(gameObject);
            this.ResolveCollisions(gameObject);
            this.ApplyGravity(gameObject);
            this.ApplyAirResistance(gameObject);
            // Update
            gameObject.Update(this.timeSplit/1000);
            // Draw
            this.Draw(gameObject);
        });
        this.lastTimeStamp = timestamp;
    }

    UserInput(){
        if(this.keyPresses['w'] && !this.player.Falling())
            this.player.ApplyForce({x:0,y:-200});
        else if(this.keyPresses['a'])
            this.player.ApplyForce({x:-200,y:0});
        else if(this.keyPresses['d'])
            this.player.ApplyForce({x:200,y:0});
    }

    Draw(gameObject){
        if(gameObject.fill instanceof Image)
            this.context.drawImage(gameObject.fill, gameObject.x, gameObject.y, gameObject.width, gameObject.height);
        else {
            this.context.fillStyle = gameObject.fill;
            this.context.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);
        }
    }

    GameOver(e){

    }

    LevelOver(e){
        let nextLevelIndex = this.levels.indexOf(this.currentLevel) + 1;
        if(nextLevelIndex == this.levels.length)
            Element.dispatchEvent(new GameOverEvent());
        else 
            this.currentLevel = this.levels[nextLevelIndex];
    }

    KeyDownHandler(e){
        this.keyPresses[e.key] = true;
    }

    KeyUpHandler(e){
        this.keyPresses[e.key] = false;
    }

    MouseHandler = (e) => {
        this.mouse = e;
    }
}