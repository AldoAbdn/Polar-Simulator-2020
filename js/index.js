function startGame() {
    var game = new Game();
    game.Start();
    // Hide title
    var title = document.getElementById("TitleScreen");
    title.style.display = "none";
    // Show Music Bar
    var musicBar = document.getElementById("MusicBar");
    musicBar.style.display = "block";
}