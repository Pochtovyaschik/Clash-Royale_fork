
// ГРАФИКА - отрисовка всего на канвасе
window.Graphics = {
    ctx: null,
    images: {},
    
    init: function(ctx) {
        this.ctx = ctx;
        this.loadImages();
    },
    
    loadImages: function() {
        for (let key in CONFIG.IMAGES) {
            const img = new Image();
            img.src = CONFIG.IMAGES[key];
            this.images[key] = img;
        }
    },
    
    drawImage: function(key, x, y, w, h) {
        const img = this.images[key];
        if (img && img.complete) {
            this.ctx.drawImage(img, x, y, w, h);
        } else {
            // Заглушка, если картинка не загружена
            this.ctx.fillStyle = '#888';
            this.ctx.fillRect(x, y, w, h);
        }
    },
    
    
    drawTiledImage: function(key, x, y, width, height, tileWidth, tileHeight) {
        const img = this.images[key];
        if (!img || !img.complete) {
            // Заглушка
            this.ctx.fillStyle = '#888';
            this.ctx.fillRect(x, y, width, height);
            return;
        }
        
        for (let row = 0; row < height; row += tileHeight) {
            for (let col = 0; col < width; col += tileWidth) {
                const drawWidth = Math.min(tileWidth, width - col);
                const drawHeight = Math.min(tileHeight, height - row);
                this.ctx.drawImage(img, x + col, y + row, drawWidth, drawHeight);
            }
        }
    },
    
    drawArena: function() {
        // Трава (заполняем весь фон травой)
        this.drawTiledImage('grass', 0, 0, CONFIG.GAME.width, CONFIG.GAME.height, 50, 50);
        
        // Дорожка (от левого до правого края, ширина 50px)
        this.drawTiledImage('path', 0, 280, CONFIG.GAME.width, 50, 50, 50);
        
        // Река (от левого до правого края, ширина 15px)
        this.drawTiledImage('river', 0, 330, CONFIG.GAME.width, 15, 50, 15);
    },
    
    drawPlayerTower: function() {
        const t = CONFIG.GAME.towers.player;
        this.drawImage('playerTower', t.x - 35, t.y - 60, 70, 80);
        
        // HP bar
        const percent = GameState.playerTowerHP / 1500;
        this.ctx.fillStyle = '#aa2e2e';
        this.ctx.fillRect(t.x - 30, t.y - 70, 60, 8);
        this.ctx.fillStyle = '#4eff6e';
        this.ctx.fillRect(t.x - 30, t.y - 70, 60 * percent, 8);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 12px monospace';
        this.ctx.fillText(`❤️ ${Math.floor(GameState.playerTowerHP)}`, t.x - 20, t.y - 75);
    },
    
    drawEnemyTower: function() {
        const t = CONFIG.GAME.towers.enemy;
        this.drawImage('enemyTower', t.x - 35, t.y - 25, 70, 80);
        
        const percent = GameState.enemyTowerHP / 1500;
        this.ctx.fillStyle = '#aa2e2e';
        this.ctx.fillRect(t.x - 30, t.y - 30, 60, 8);
        this.ctx.fillStyle = '#4eff6e';
        this.ctx.fillRect(t.x - 30, t.y - 30, 60 * percent, 8);
        
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`❤️ ${Math.floor(GameState.enemyTowerHP)}`, t.x - 20, t.y - 35);
    },
    
    drawKingTower: function(isPlayer) {
        const y = isPlayer ? 570 : 15;
        this.drawImage('kingTower', 410, y - 50, 80, 90);
    },
    
    drawUI: function() {
        // Эликсир бар
        const percent = GameState.elixir / CONFIG.GAME.maxElixir;
        this.ctx.fillStyle = '#2c1a0e';
        this.ctx.fillRect(20, 15, 200, 20);
        this.ctx.fillStyle = '#d13aff';
        this.ctx.fillRect(20, 15, 200 * percent, 20);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 16px monospace';
        this.ctx.fillText(`⚡ ${Math.floor(GameState.elixir)}/${CONFIG.GAME.maxElixir}`, 30, 32);
        
        // Выбранный юнит
        const cost = CONFIG.GAME.units[GameState.selectedUnit].cost;
        this.ctx.fillStyle = '#ffd966';
        this.ctx.font = '14px monospace';
        this.ctx.fillText(`Selected: ${GameState.selectedUnit} (${cost}⚡)`, 20, 55);
    },
    
    drawUnit: function(unit) {
        this.drawImage(unit.type, unit.x - 20, unit.y - 20, 40, 40);
        
        // HP bar
        const percent = unit.hp / unit.maxHp;
        this.ctx.fillStyle = '#aa2e2e';
        this.ctx.fillRect(unit.x - 18, unit.y - 28, 36, 4);
        this.ctx.fillStyle = '#4eff6e';
        this.ctx.fillRect(unit.x - 18, unit.y - 28, 36 * percent, 4);
    }
};

