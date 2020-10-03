class Level {
    constructor(gravity, airResistance, background, player, gameObjects, height = null, width = null){
        this.gravity = gravity;
        this.airResistance = airResistance;
        this.background = background;
        this.height = height;
        this.width = width;
        this.player = player;
        this.gameObjects = gameObjects;
    }

    Update(timesplit){
        this.gameObjects.forEach(gameObject => gameObject.Update(timesplit));
    }
}