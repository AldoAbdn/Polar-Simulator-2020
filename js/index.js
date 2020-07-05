var gameManager = new GameManager();

function OnLoad(){
    let endTitles = document.getElementById("EndCredits");
    let delay = 0;
    for(child of endTitles.children){
        child.style.animationDelay = delay + "s";
        delay += 5;
    }
}