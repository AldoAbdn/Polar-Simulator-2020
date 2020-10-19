class GameEngine {
    constructor(){
        this.fps = new FPS();
        this.displayManager = new DisplayManager();
        this.inputManager = new InputManager();
        this.musicManager = new MusicManager();
        this.physicsManager = new PhysicsManager();
        this.timer = new Timer();
        this.levelManager = new LevelManager();
        this.GameLoop = this.GameLoop.bind(this);
    }

    // Starts game loop
    Start(){
        this.GameLoop(0);
    }

    // Main Game Loop
    GameLoop(timestamp){
        window.requestAnimationFrame(this.GameLoop);
        this.timer.TimeSplit(timestamp);
        let currentLevel = this.levelManager.currentLevel;
        if(this.timer.Time() > this.fps.interval){
            this.inputManager.HandleInput(currentLevel.gameObjects);
            this.physicsManager.ApplyPhysics(currentLevel.gameObjects);
            currentLevel.Update(this.timer.TimeInSeconds());
            this.displayManager.Draw(currentLevel);
            this.timer.Reset();
        }
    }
}