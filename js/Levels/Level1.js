class Level1 extends Level {
    constructor(){
        let player = new Bear(0, 830, 100, 200);
        let gameObjects = [new Border(0, 1080 - 50, 1920, 50), new Border(-1920, 0, 1920, 1080), new Border(1920, 0, 1920, 1080), new Border(0, -1080, 1920, 1080)];
        super(10, 1, "#FFaa22", player, gameObjects);
    }
}