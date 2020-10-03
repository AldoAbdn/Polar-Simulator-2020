class Level1 extends Level {
    constructor(){
        let player = new Bear(10, this.displayManager.canvas.height-150, 50, 100, 10);
        let gameObjects = [this.player, new Border(0, this.displayManager.canvas.height - 50, this.displayManager.canvas.width, 50), new Border(-50, 0, 50, this.displayManager.canvas.height), new Border(this.displayManager.canvas.width, 0, 50, this.displayManager.canvas.height), new Border(0, -50, this.displayManager.canvas.width, 50)];
        super(10, 1, "#add8e6", null, null, player, gameObjects);
    }
}