
// Animation du cœur qui bat
class HeartAnimation {
    constructor() {
        this.heartImage = document.querySelector('.hero-image img');
        this.currentFrame = 1;
        this.isSpecialSequence = false;
        this.specialFrameIndex = 0;
        this.basePath = 'assets/imgs/';
        
        // Timings pour un battement réaliste (ba-boum... ba-boum...)
        this.shortBeatDuration = 150; // Durée courte pour "ba"
        this.longBeatDuration = 200; // Durée un peu plus longue pour "boum"
        this.pauseDuration = 500; // Pause entre les battements
        this.specialSequenceInterval = 3000; // 3 secondes
        this.specialFrameDuration = 300; // Durée de chaque frame spéciale
        
        this.init();
    }
    
    init() {
        // Démarrer l'animation normale
        this.startNormalBeat();
        
        // Programmer les séquences spéciales toutes les 3 secondes
        this.startSpecialSequenceTimer();
    }
    
    startNormalBeat() {
        this.playHeartBeat();
    }
    
    playHeartBeat() {
        if (this.isSpecialSequence) {
            // Reporter le battement si on est en séquence spéciale
            setTimeout(() => this.playHeartBeat(), 100);
            return;
        }
        
        // Premier battement "ba" (frame1 → frame2)
        this.updateImage('frame1.png');
        setTimeout(() => {
            if (!this.isSpecialSequence) {
                this.updateImage('frame2.png');
            }
        }, this.shortBeatDuration);
        
        // Deuxième battement "boum" (frame2 → frame1)
        setTimeout(() => {
            if (!this.isSpecialSequence) {
                this.updateImage('frame1.png');
            }
        }, this.shortBeatDuration + this.longBeatDuration);
        
        setTimeout(() => {
            if (!this.isSpecialSequence) {
                this.updateImage('frame2.png');
            }
        }, this.shortBeatDuration + this.longBeatDuration + this.shortBeatDuration);
        
        // Pause puis recommencer le cycle
        setTimeout(() => {
            this.playHeartBeat();
        }, this.shortBeatDuration + this.longBeatDuration + this.shortBeatDuration + this.pauseDuration);
    }
    
    startSpecialSequenceTimer() {
        setInterval(() => {
            this.playSpecialSequence();
        }, this.specialSequenceInterval);
    }
    
    playSpecialSequence() {
        this.isSpecialSequence = true;
        this.specialFrameIndex = 0;
        
        const specialFrames = ['frame3.png', 'frame4.png', 'frame5.png'];
        
        const playNextSpecialFrame = () => {
            if (this.specialFrameIndex < specialFrames.length) {
                this.updateImage(specialFrames[this.specialFrameIndex]);
                this.specialFrameIndex++;
                
                setTimeout(playNextSpecialFrame, this.specialFrameDuration);
            } else {
                // Fin de la séquence spéciale, revenir au battement normal
                this.isSpecialSequence = false;
                this.currentFrame = 1; // Repartir sur frame1
                this.updateImage('frame1.png');
            }
        };
        
        playNextSpecialFrame();
    }
    
    updateImage(frameName) {
        if (this.heartImage) {
            this.heartImage.src = this.basePath + frameName;
        }
    }
    
    // Méthode pour arrêter l'animation si nécessaire
    stop() {
        if (this.normalBeatTimer) {
            clearInterval(this.normalBeatTimer);
        }
    }
}

// Initialiser l'animation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const heartAnimation = new HeartAnimation();
    
    // Optionnel : rendre l'animation accessible globalement
    window.heartAnimation = heartAnimation;
});
