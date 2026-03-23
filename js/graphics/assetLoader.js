// Asset Loader - загрузка всех ресурсов с индикатором прогресса
window.AssetLoader = {
    totalAssets: 0,
    loadedAssets: 0,
    onProgress: null,
    onComplete: null,
    
    start: function(onProgress, onComplete) {
        this.onProgress = onProgress;
        this.onComplete = onComplete;
        this.loadImages();
        this.loadSounds();
    },
    
    loadImages: function() {
        const images = [
            'assets/images/arena/grass.png',
            'assets/images/arena/path.png',
            'assets/images/arena/river.png',
            'assets/images/towers/player_tower.png',
            'assets/images/towers/enemy_tower.png',
            'assets/images/units/knight.png',
            'assets/images/units/archer.png',
            'assets/images/units/mage.png'
        ];
        
        this.totalAssets += images.length;
        
        images.forEach(src => {
            const img = new Image();
            img.onload = () => this.assetLoaded(`Image: ${src.split('/').pop()}`);
            img.onerror = () => {
                console.warn(`Failed: ${src}`);
                this.assetLoaded(`Failed: ${src.split('/').pop()}`);
            };
            img.src = src;
        });
    },
    
    loadSounds: function() {
        const sounds = [
            'assets/audio/sounds/deploy.mp3',
            'assets/audio/sounds/hit.mp3'
        ];
        
        this.totalAssets += sounds.length;
        
        sounds.forEach(src => {
            const audio = new Audio();
            audio.oncanplaythrough = () => this.assetLoaded(`Sound: ${src.split('/').pop()}`);
            audio.onerror = () => {
                console.warn(`Sound failed: ${src}`);
                this.assetLoaded(`Sound failed: ${src.split('/').pop()}`);
            };
            audio.src = src;
        });
    },
    
    assetLoaded: function(name) {
        this.loadedAssets++;
        const percent = Math.floor((this.loadedAssets / this.totalAssets) * 100);
        
        if (this.onProgress) {
            this.onProgress(percent, `${name} (${this.loadedAssets}/${this.totalAssets})`);
        }
        
        console.log(`📦 Loading: ${percent}% - ${name}`);
        
        if (this.loadedAssets === this.totalAssets && this.onComplete) {
            console.log('🎉 All assets loaded!');
            this.onComplete();
        }
    },
    
    getProgress: function() {
        return {
            loaded: this.loadedAssets,
            total: this.totalAssets,
            percent: Math.floor((this.loadedAssets / this.totalAssets) * 100)
        };
    }
};
