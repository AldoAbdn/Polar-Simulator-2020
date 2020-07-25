class DisplayManager {
    constructor(){
        // Setup Canvas
        this.canvas = document.getElementById("GameCanvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set Context
        this.context = this.canvas.getContext('2d');
    }

    Clear(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    Draw(gameObjects){
        gameObjects.forEach(gameObject => {
            if(gameObject.fill instanceof Image)
                this.context.drawImage(gameObject.fill, gameObject.x, gameObject.y, gameObject.width, gameObject.height);
            else {
                this.context.fillStyle = gameObject.fill;
                this.context.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);
            }
        });
    }
}