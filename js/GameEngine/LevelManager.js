class LevelManager {
    constructor(){
        // Levels
        this.index = 0;
        this.levels = this.SetupLevels();
        if(this.levels.length > 0)
            this.currentLevel = this.levels[this.index];
        else
            this.currentLevel = null;
        // Events
        this.GameOver = this.GameOver.bind(this);
        this.LevelOver = this.LevelOver.bind(this);
        this.LevelReset = this.LevelReset.bind(this);
        document.addEventListener('GameOver', this.GameOver, false);
        document.addEventListener('LevelOver', this.LevelOver, false);
        document.addEventListener('LevelReset', this.LevelReset, false);
    }

    SetupLevels(){
        return [
            new Level1()
        ]
    }

    Next(){
        if(this.index + 1 >= this.levels.length)
            return null;
        else
            this.index += 1;
        this.currentLevel = this.levels[this.index];
        return this.currentLevel;
    }

    Previous(){
        if(this.index - 1 < 0)
            return null;
        else
            this.index -= 1;
        this.currentLevel = this.levels[this.index];
        return this.currentLevel;
    }

    Select(index){
        if(index < this.levels.length && index >= 0){
            this.index = index;
            this.currentLevel = this.levels[this.index];
            return this.currentLevel;
        } else 
            return null;
    }

    GameOver(e){
        this.index = 0;
        this.LevelReset(e);
    }

    LevelOver(e){
        let level = this.Next();
        if(level == null)
            document.dispatchEvent(new GameOverEvent());
    }

    LevelReset(e){
        this.levels = this.SetupLevels();
        this.currentLevel = this.levels[this.index];
    }
}