// ========== SOUND MODULE ==========
// SOUND - звуковые эффекты
window.SoundFX = {
    deployAudio: null,
    hitAudio: null,
    
    init: function() {
        this.deployAudio = document.getElementById('deploySound');
        this.hitAudio = document.getElementById('hitSound');
        
        if (this.deployAudio) this.deployAudio.src = CONFIG.SOUNDS.deploy;
        if (this.hitAudio) this.hitAudio.src = CONFIG.SOUNDS.hit;
    },
    
    playDeploy: function() {
        if (this.deployAudio) {
            this.deployAudio.currentTime = 0;
            this.deployAudio.play().catch(e => console.log('audio blocked'));
        }
    },
    
    playHit: function() {
        if (this.hitAudio) {
            this.hitAudio.currentTime = 0;
            this.hitAudio.play().catch(e => console.log('audio blocked'));
        }
    }
};

window.SoundFX = {
    sounds: {},
    enabled: true,
    
    init: function() {
        // Загружаем все звуки из конфига
        for (let key in CONFIG.SOUNDS) {
            const audio = new Audio();
            audio.src = CONFIG.SOUNDS[key];
            audio.preload = 'auto';
            this.sounds[key] = audio;
            console.log(`Loaded sound: ${key} -> ${CONFIG.SOUNDS[key]}`);
        }
    },
    
    play: function(soundName) {
        if (!this.enabled) return;
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log(`Sound ${soundName} blocked`));
        } else {
            console.log(`Sound ${soundName} not found`);
        }
    },
    
    setEnabled: function(value) {
        this.enabled = value;
    }
};
