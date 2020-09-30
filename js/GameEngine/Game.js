class Game {
    constructor(){
        // FPS
        this.fps = 60;
        this.fpsInterval = 1000 / this.fps;
        // Display
        this.displayManager = new DisplayManager();
        // Events
        this.GameOver = this.GameOver.bind(this);
        this.LevelOver = this.LevelOver.bind(this);
        document.addEventListener('GameOver', this.GameOver, false);
        document.addEventListener('LevelOver', this.LevelOver, false);
        // Input
        this.inputManager = new InputManager();
        // Music
        this.musicManager = new MusicManager();
        // Physics
        this.physicsManager = new PhysicsManager();
        // Game Loop
        this.GameLoop = this.GameLoop.bind(this);
        // Setup Levels
        this.timer = 0;
        this.timeSplit = 0;
        this.lastTimeStamp = 0;
        this.gravity = 10;
        this.levels = [];
        this.player = new Bear(10, this.displayManager.canvas.height-150, 50, 100, 10);
        this.gameObjects = [this.player, new Border(0, this.displayManager.canvas.height - 50, this.displayManager.canvas.width, 50), new Border(-50, 0, 50, this.displayManager.canvas.height), new Border(this.displayManager.canvas.width, 0, 50, this.displayManager.canvas.height), new Border(0, -50, this.displayManager.canvas.width, 50)]
       // this.currentLevel = this.levels[0];
    }

    // Starts game loop
    Start(){
        this.GameLoop(0);
    }

    GameLoop(timestamp){
        window.requestAnimationFrame(this.GameLoop);
        this.timeSplit = timestamp - this.lastTimeStamp;
        this.timer += this.timeSplit;
        if(this.timer > this.fpsInterval){
            this.displayManager.Clear();
            this.inputManager.HandleInput(this.gameObjects);
            this.physicsManager.ApplyPhysics(this.gameObjects);
            this.gameObjects.forEach(gameObject => gameObject.Update(this.timer/1000));
            this.displayManager.Draw(this.gameObjects);
            this.timer = 0;
        }
        this.lastTimeStamp = timestamp;
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
}