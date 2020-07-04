class Crate extends BoxRigidBody
{
    constructor(x, y, width, height){
        super(x, y, width, height,"./img/Crate.png",true,0.9,0.5,1,true,false);
        this.fill = new Image();
        this.fill.src = "./img/Crate.png";
    }
}