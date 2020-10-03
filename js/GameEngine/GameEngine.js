class GameEngine {
    constructor(){
        this.fps = new FPS();
        this.displayManager = new DisplayManager();
        this.inputManager = new InputManager();
        this.musicManager = new MusicManager();
        this.physicsManager = new PhysicsManager();
        this.Timer = new Timer();
        this.levelManager = new LevelManager();
        this.GameLoop = this.GameLoop.bind(this);
    }

    // Starts game loop
    Start(){
        this.GameLoop(0);
    }

    GameLoop(timestamp){
        window.requestAnimationFrame(this.GameLoop);
        this.timer.TimeSplit(timestamp);
        let currentLevel = this.LevelManager.currentLevel;
        if(this.timer.Time() > this.fps.interval){
            this.displayManager.Clear();
            this.inputManager.HandleInput(currentLevel);
            this.physicsManager.ApplyPhysics(currentLevel);
            this.currentLevel.Update(this.timer.TimeInSeconds());
            this.displayManager.Draw(currentLevel);
            this.timer.Reset();
        }
    }
}