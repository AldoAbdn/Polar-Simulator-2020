class InputManager {
    constructor(){
        this.keyPresses = {};
        this.mouse = {};
        this.KeyDownHandler = this.KeyDownHandler.bind(this);
        this.KeyUpHandler = this.KeyUpHandler.bind(this);
        this.MouseHandler = this.MouseHandler.bind(this);
        window.addEventListener('keydown', this.KeyDownHandler, false);
        window.addEventListener('keyup', this.KeyUpHandler, false);
        window.addEventListener('mousedown', this.MouseHandler, false);
        window.addEventListener('mouseup', this.MouseHandler, false);
        window.addEventListener('mousemove', this.MouseHandler, false);
    }

    GetMouse(){
        return this.mouse;
    }

    GetKeyPresses() {
        return this.keyPresses;
    }

    KeyDownHandler(e){
        this.keyPresses[e.key] = true;
    }

    KeyUpHandler(e){
        this.keyPresses[e.key] = false;
    }

    MouseHandler(e){
        this.mouse = e;
    }

    HandleInput(gameObjects){
        gameObjects.forEach(gameObject => {
            gameObject.handleInput(this.keyPresses, this.mouse);
        });
    }
}