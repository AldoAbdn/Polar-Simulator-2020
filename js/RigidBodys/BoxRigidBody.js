class BoxRigidBody {
    constructor(x,y,width,height,fill,fixed=true,friction=0.9,bounciness=0,mass=1,solid=true,collectable=false){
        // Rect
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        // Fill
        this.fill = fill
        // Physics
        this.fixed = fixed;
        this.friction = friction;
        this.bounciness = bounciness;
        this.acceleration = {x:0,y:0};
        this.mass = mass;
        this.solid = solid;
        this.velocity = {x:0,y:0};
        this.falling = true;
        // Collectable 
        this.collectable;
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
}