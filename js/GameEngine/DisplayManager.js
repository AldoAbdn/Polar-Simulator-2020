class DisplayManager {
    constructor(){
        // Setup Canvas
        this.canvas = document.getElementById("GameCanvas");
        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        // Set Context
        this.context = this.canvas.getContext('2d');
        let scaleFitNative = Math.min(window.innerWidth / this.width, window.innerHeight / this.height);
        this.context.setTransform(scaleFitNative, 0, 0, scaleFitNative, 0, 0);
        // Resize
        this.HandleResize = this.HandleResize.bind(this);
        window.addEventListener("resize", this.HandleResize, false);
    }

    Clear(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    Draw(level){
        this.Clear();
        // Background
        this.DrawItem(level.background, 0, 0, this.canvas.width, this.canvas.height);
        // Game Objects
        level.gameObjects.forEach(gameObject => {
            this.DrawItem(gameObject.fill, gameObject.x, gameObject.y, gameObject.width, gameObject.height);
        });
    }

    DrawItem(item, x, y, width, height){
        if(item instanceof Image)
            this.context.drawImage(item, x, y, width, height);
        else {
            this.context.fillStyle = item;
            this.context.fillRect(x, y, width, height);
        }
    }

    HandleResize(event){
        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";
    }
}