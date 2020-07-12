class Game {
    constructor(){
        // Setup Canvas
        this.canvas = document.getElementById("GameCanvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set Context
        this.context = this.canvas.getContext('2d');
        // Events
        document.addEventListener('GameOver', this.GameOver, false);
        document.addEventListener('LevelOver', this.LevelOver, false);
        this.keyPresses = {};
        this.mouse;
        window.addEventListener('keydown', this.KeyDownHandler, false);
        window.addEventListener('keyup', this.KeyUpHandler, false);
        window.addEventListener('mousedown', this.MouseHandler, false);
        window.addEventListener('mouseup', this.MouseHandler, false);
        window.addEventListener('mousemove', this.MouseHandler, false);
        // Music
        this.musicManager = new MusicManager();
        // Setup Levels
        this.timeSplit = 0;
        this.lastTimeStamp = 0;
        this.gravity = 10;
        this.levels = [];
        this.player = new Bear(10, this.canvas.height-200, 50, 100, 10);
        this.gameObjects = [this.player, new Border(0, this.canvas.height - 50, this.canvas.width, 50), new Border(-50, 0, 50, this.canvas.height), new Border(this.canvas.width, 0, 50, this.canvas.height), new Border(0, -50, this.canvas.width, 50)]
       // this.currentLevel = this.levels[0];
    }

    // Starts game loop
    Start = () => {
        this.GameLoop(0);
    }

    GameLoop = (timestamp) => {
        window.requestAnimationFrame(this.GameLoop);
        this.timeSplit = timestamp - this.lastTimeStamp;
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.UserInput();
        this.gameObjects.forEach(gameObject => {
            this.ResolveCollisions(gameObject);
            this.ApplyGravity(gameObject);
            this.ApplyAirResistance(gameObject);
            gameObject.Update(this.timeSplit/1000);
            this.Draw(gameObject);
        });
        this.lastTimeStamp = timestamp;
    }

    UserInput = () => {
        if(this.keyPresses['w'] && !this.player.Falling())
            this.player.ApplyForce({x:0,y:-200});
        else if(this.keyPresses['a'])
            this.player.ApplyForce({x:-200,y:0});
        else if(this.keyPresses['d'])
            this.player.ApplyForce({x:200,y:0});
    }

    Draw = (gameObject) => {
        if(gameObject.fill instanceof Image)
            this.context.drawImage(gameObject.fill, gameObject.x, gameObject.y, gameObject.width, gameObject.height);
        else {
            this.context.fillStyle = gameObject.fill;
            this.context.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);
        }
    }

    ApplyGravity = (gameObject) => {

        if(!gameObject.fixed && gameObject.Falling()){
            gameObject.ApplyForce(gameObject.Weight(this.gravity));
        }

    }

    ApplyAirResistance = (gameObject) => {
        if(gameObject.Falling())
            this.ApplyFriction(gameObject, 0.5);
    }

    ApplyFriction = (gameObject, friction) => {
        if(gameObject.acceleration.x < 5 && gameObject.acceleration.x > -5 && gameObject.velocity.x != 0){
            gameObject.acceleration.x = 0;
            gameObject.velocity.x = 0;
        } else {
            let force = {x:gameObject.mass * gameObject.acceleration.x * -1 * friction,y:0}
            gameObject.ApplyForce(force);
        }
    }

    ApplyBounciness = (gameObject, bounciness) => {
        if(gameObject.acceleration.y < 5 && gameObject.acceleration.y > -5){
            gameObject.acceleration.y = 0;
            gameObject.velocity.y = 0;
        } else {
            if(gameObject.velocity.y > 0)
                gameObject.velocity.y *= -1 * bounciness;
            let force = gameObject.Weight(this.gravity);
            force.y *= -1;
            gameObject.ApplyForce(force);
        }
    }
    
    ResolveCollisions = (gameObject) => {
        this.gameObjects.forEach(collideable => {
            // Check if there was a collision
            if(gameObject!=collideable && gameObject.Colliding(collideable) && !gameObject.fixed){
                this.ResolveFixedCollision(gameObject, collideable);
            } else if(gameObject.collectable) {
                this.ResolveCollectableCollision(gameObject, collideable);
            }
        });
    }

    ResolveFixedCollision = (colliding, collideable) => {
        let collision = this.ResolveSideCollision(colliding, collideable);
        switch(collision){
            case "TOP":
                colliding.StopY();
                break;
            case "BOTTOM":
                colliding.StopY();
                this.ApplyBounciness(colliding, collideable.bounciness);
                this.ApplyFriction(colliding, collideable.friction);
                break;
            case "LEFT":
                colliding.StopX();
                break;
            case "Right":
                colliding.StopX();
                break;
        }
    }

    ResolveCollectableCollision = (colliding, collideable) => {
        
    }

    ResolveSideCollision = (A, B) => {
        // get the vectors to check against
        var vX = (A.x + (A.width / 2))  - (B.x + (B.width / 2)),
            vY = (A.y + (A.height / 2)) - (B.y + (B.height / 2)),
            // Half widths and half heights of the objects
            ww2 = (A.width / 2) + (B.width / 2),
            hh2 = (A.height / 2) + (B.height / 2),
            colDir = "";
    
        // if the x and y vector are less than the half width or half height,
        // they we must be inside the object, causing a collision
        if (Math.abs(vX) < ww2 && Math.abs(vY) < hh2) {
            // figures out on which side we are colliding (top, bottom, left, or right)
            var oX = ww2 - Math.abs(vX),
                oY = hh2 - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "TOP";
                    A.y += oY;
                } else {
                    colDir = "BOTTOM";
                    A.y -= oY;
                }
            } else {
                if (vX > 0) {
                    colDir = "LEFT";
                    A.x += oX;
                } else {
                    colDir = "RIGHT";
                    A.x -= oX;
                }
            }
        }
        return colDir; // If you need info of the side that collided
    }

    GameOver = (e) => {

    }

    LevelOver = (e) => {
        let nextLevelIndex = this.levels.indexOf(this.currentLevel) + 1;
        if(nextLevelIndex == this.levels.length)
            Element.dispatchEvent(new GameOverEvent());
        else 
            this.currentLevel = this.levels[nextLevelIndex];
    }

    KeyDownHandler = (e) => {
        this.keyPresses[e.key] = true;
    }

    KeyUpHandler = (e) => {
        this.keyPresses[e.key] = false;
    }

    MouseHandler = (e) => {
        this.mouse = e;
    }
}