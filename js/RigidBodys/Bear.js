class Bear extends BoxRigidBody
{
    constructor(x, y, width, height){
        super(x,y,width,height,"./img/Bear-Left.png","./img/Bear-Right.png",false,0,0,1,true,false);
    }

    handleInput(keyPresses, mouse){
        if(keyPresses['w'] && !this.Falling())
            this.ApplyForce({x:0,y:-200});
        else if(keyPresses['a'])
            this.ApplyForce({x:-200,y:0});
        else if(keyPresses['d'])
            this.ApplyForce({x:200,y:0});
        else
            this.StopX();
    }
}