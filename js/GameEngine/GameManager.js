class GameManager {
    constructor(){
        this.StartGame = this.StartGame.bind(this);
        this.AnimationEnd = this.AnimationEnd.bind(this);
        this.GameOver = this.GameOver.bind(this);
        this.title = document.getElementById("TitleScreen");
        this.musicBar = document.getElementById("MusicBar");
        this.gameCanvas = document.getElementById("GameCanvas");
        this.endCredits = document.getElementById("EndCredits");
        this.endCredits.addEventListener("webkitAnimatinEnd", this.AnimationEnd, false);
        this.endCredits.addEventListener("animationend", this.AnimationEnd, false);
        document.addEventListener("GameOver", this.GameOver, false);
        this.creditCount = 0;
    }
    
    StartGame() {
        this.game = new Game();
        this.game.Start();
        this.title.style.display = "none";
        this.musicBar.style.display = "block";
        this.gameCanvas.style.display = "block";
    }

    GameOver() {
        this.game.musicManager.SetMusic("EndMusic");
        this.gameCanvas.style.display = "none";
        this.musicBar.style.display = "none";
        this.endCredits.style.display = "block";
    }

    AnimationEnd() {
        this.creditCount += 1;
        if(this.creditCount >= this.endCredits.children.length)
            this.Reset();
    }
    
    Reset(){
        this.creditCount = 0;
        this.game.musicManager.Stop();
        this.game = null;
        this.endCredits.style.display = "none";
        this.gameCanvas.style.display = "none";
        this.musicBar.style.display = "none";
        this.title.style.display = "flex";
    }
}