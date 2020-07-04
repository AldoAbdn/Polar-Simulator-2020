class MusicManager {
    constructor(){
        this.ConfigureVolumeSlider();
        this.ConfigureMusic();
    }

    GetVolume(){
        return parseFloat(localStorage.getItem("volume"));
    }

    SetVolume(volume) {
        if(this.volumeSlider.valueAsNumber != volume)
            this.volumeSlider.value = volume;
        localStorage.setItem("volume", volume);
        if(this.currentlyPlaying)
            this.currentlyPlaying.volume = volume / 100;
    }

    GetCurrentlyPlaying(){
        return this.currentlyPlaying;
    }

    SetCurrentlyPlaying(music){
        if(this.currentlyPlaying)
            this.currentlyPlaying.stop();
        this.currentlyPlaying = music;
        this.currentlyPlaying.play();
    }

    ConfigureVolumeSlider(){
        this.volumeSlider = document.getElementById("Volume");
        this.VolumeHandler = this.VolumeHandler.bind(this);
        this.volumeSlider.addEventListener("input", this.VolumeHandler, false);
        this.volumeSlider.addEventListener("change", this.VolumeHandler, false);
    }

    ConfigureMusic(){
        this.music = {
            "MainMusic": document.getElementById("MainMusic"),
            "EndMusic": document.getElementById("EndMusic")
        };
        this.SetCurrentlyPlaying(this.music["MainMusic"]);
        this.SetVolume(this.GetVolume());
    }

    VolumeHandler(e){
        if(this.GetCurrentlyPlaying() != null)
            this.SetVolume(this.volumeSlider.valueAsNumber);        
    }
}