class Bear extends BoxRigidBody
{
    constructor(x, y, width, height){
        super(x,y,width,height,"./img/Bear-Left.png",false,0,0,1,true,false);
        this.leftImage = new Image();
        this.leftImage.src = "./img/Bear-Left.png";
        this.rightImage = new Image();
        this.rightImage.src = "./img/Bear-Right.png";
        this.fill = this.rightImage;
    }
    
    Update(seconds){
        super.Update(seconds);
        if(this.velocity.x > 0)
            this.fill = this.rightImage;
        else if(this.velocity.x < 0)
            this.fill = this.leftImage;
    }
}