class PhysicsManager {
    constructor(gravity=10){
        this.gravity = gravity;
    }

    ApplyPhysics(rigidBodys){
        rigidBodys.forEach(rigidBody => {
            this.ResolveCollisions(rigidBodys,rigidBody);
            this.ApplyGravity(rigidBody);
            this.ApplyAirResistance(rigidBody);
        });
    }

    ApplyGravity(rigidBody){
        if(!rigidBody.fixed && rigidBody.Falling())
            rigidBody.ApplyForce(rigidBody.Weight(this.gravity));
    }

    ApplyAirResistance(rigidBody){
        if(rigidBody.Falling())
            this.ApplyFriction(rigidBody, 0.5);
    }

    ApplyFriction(rigidBody, friction){
        if(rigidBody.acceleration.x < 5 && rigidBody.acceleration.x > -5 && rigidBody.velocity.x != 0){
            rigidBody.acceleration.x = 0;
            rigidBody.velocity.x = 0;
        } else {
            let force = {x:rigidBody.mass * rigidBody.acceleration.x * -1 * friction,y:0}
            rigidBody.ApplyForce(force);
        }
    }

    ApplyBounciness(rigidBody, bounciness){
        if(rigidBody.acceleration.y < 5 && rigidBody.acceleration.y > -5){
            rigidBody.acceleration.y = 0;
            rigidBody.velocity.y = 0;
        } else {
            if(rigidBody.velocity.y > 0)
                rigidBody.velocity.y *= -1 * bounciness;
            let force = rigidBody.Weight(this.gravity);
            force.y *= -1;
            rigidBody.ApplyForce(force);
        }
    }
    
    ResolveCollisions(rigidBodys, rigidBody){
        rigidBodys.forEach(collideable => {
            // Check if there was a collision
            if(rigidBody!=collideable && rigidBody.Colliding(collideable) && !rigidBody.fixed){
                this.ResolveFixedCollision(rigidBody, collideable);
            } else if(rigidBody.collectable) {
                this.ResolveCollectableCollision(rigidBody, collideable);
            }
        });
    }

    ResolveFixedCollision(colliding, collideable){
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

    ResolveCollectableCollision(colliding, collideable){
        
    }

    ResolveSideCollision(A, B){
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
}