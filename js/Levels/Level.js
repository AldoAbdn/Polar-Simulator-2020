class Level {
    constructor(gravity, airResistance, background, player, gameObjects){
        this.gravity = gravity;
        this.airResistance = airResistance;
        this.background = background;
        this.player = player;
        this.gameObjects = gameObjects;
        this.gameObjects.push(this.player);
    }

    Update(timesplit){
        this.gameObjects.forEach(gameObject => gameObject.Update(timesplit));
    }
}