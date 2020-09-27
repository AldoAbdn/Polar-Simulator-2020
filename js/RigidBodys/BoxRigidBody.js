class BoxRigidBody {
    constructor(x,y,width,height,fillLeft,fillRight,fixed=true,friction=0.9,bounciness=0,mass=1,solid=true,collectable=false){
        // Rect
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        // Fill
        if(fillLeft.startsWith("#"))
            this.fillLeft = fillLeft;
        else {
            this.fillLeft = new Image();
            this.fillLeft.src = fillLeft;
        }
        if(fillRight.startsWith("#"))
            this.fillRight = fillRight;
        else {
            this.fillRight = new Image();
            this.fillRight.src = fillRight;
        }
        this.fill = this.fillLeft;
        // Physics
        this.fixed = fixed;
        this.friction = friction;
        this.bounciness = bounciness;
        this.acceleration = {x:0,y:0};
        this.mass = mass;
        this.solid = solid;
        this.velocity = {x:0,y:0};
        this.falling = false;
        // Collectable 
        this.collectable = collectable;
    }

    Stop() {
        this.velocity = {x:0,y:0};
        this.acceleration = {x:0,y:0};
    }

    StopX(){
        this.velocity.x = 0;
        this.acceleration.x = 0;
    }

    StopY(){
        this.velocity.y = 0;
        this.acceleration.y = 0;
    }

    Falling() {
        return this.velocity.y != 0 && this.acceleration.y != 0;
    }

    SetPosition = (x, y) => {
        this.x = x;
        this.y = y;
    }

    SetAcceleration = (acceleration) => {
        this.acceleration = acceleration;
    }

    SetVelocity = (velocity) => {
        this.velocity = velocity;
    }

    Center = () => {
        return {x:this.x+0.5*this.width,y:this.y+0.5*height};
    }

    Left = () => {
        return this.x;
    }

    Right = () => {
        return this.x + this.width;
    }

    Top = () => {
        return this.y;
    }

    Bottom = () => {
        return this.y + this.height;
    }

    TopLeft = () => {
        return {x:this.x,y:this.y};
    }

    TopRight = () => {
        return {x:this.x+this.width,y:this.y};
    }

    BottomRight = () => {
        return {x:this.x+this.width, y:this.y+this.height};
    }

    BottomLeft = () => {
        return {x:this.x, y:this.y+this.height};
    }

    ApplyForce = (force) => {
        let acceleration = {x:force.x/this.mass, y:force.y/this.mass};
        this.acceleration.x += acceleration.x;
        this.acceleration.y += acceleration.y;
    }

    Update(seconds){
        this.velocity.x += this.acceleration.x * seconds;
        this.velocity.y += this.acceleration.y * seconds;
        this.x += this.velocity.x * seconds;
        this.y += this.velocity.y * seconds;
        if(this.velocity.x > 0)
            this.fill = this.fillRight;
        else if(this.velocity.x < 0)
            this.fill = this.fillLeft;
    }

    Colliding = (collider) => {
        return !(
        ((this.Bottom()) < (collider.Top())) ||
        (this.Top() > (collider.Bottom())) ||
        ((this.Right()) < collider.Left()) ||
        (this.Left() > (collider.Right()))
        );
    }

    Weight = (gravity) => {
        return {x:0, y:this.mass * gravity};
    }

    handleInput(keyPresses, mouse){

    }
}