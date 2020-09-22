const audio = {
    createAudio: function () {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = "./sounds/Sound_08029.mp3";
        this.audio = audio;
    },
    soundPlay() {
        if (!this.audio) {
           this.createAudio();
        }
        this.audio.play();
    }
}