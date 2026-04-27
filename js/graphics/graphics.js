/**
 * @class Graphics - Отвечает за визуализацию всех игровых элементов
 */
 class Graphics {
    constructor(ctx) {
        this.ctx = ctx;
        this.images = {};
        this.lastCardAreas = [];
        this.waterOffset = 0;
        this.loadAllImages();
        console.log('🎨 Graphics initialized');
    }

    getCardAreas() {
        return this.lastCardAreas || [];
    }
    
    loadAllImages() {
        const imagePaths = window.CONFIG?.IMAGES || {};
        for (let key in imagePaths) {
            const img = new Image();
            img.src = imagePaths[key];
            this.images[key] = img;
        }
    }
    
    drawImage(key, x, y, w, h) {
        const img = this.images[key];
        if (img && img.complete && img.naturalWidth > 0) {
            this.ctx.drawImage(img, x, y, w, h);
        } else {
            this.ctx.fillStyle = '#888';
            this.ctx.fillRect(x, y, w, h);
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '10px monospace';
            this.ctx.fillText(key, x + 5, y + 15);
        }
    }
    
    drawTiledImage(key, x, y, width, height, tileW, tileH) {
        const img = this.images[key];
        if (!img || !img.complete) {
            this.ctx.fillStyle = '#555';
            this.ctx.fillRect(x, y, width, height);
            return;
        }
        
        for (let row = 0; row < height; row += tileH) {
            for (let col = 0; col < width; col += tileW) {
                const dw = Math.min(tileW, width - col);
                const dh = Math.min(tileH, height - row);
                this.ctx.drawImage(img, x + col, y + row, dw, dh);
            }
        }
    }
    
    drawArena() {
        const width = window.CONFIG.GAME.width;
        const height = window.CONFIG.GAME.height;
        
        // Фон - трава
        this.drawTiledImage('grass', 0, 0, width, height, 50, 50);
        
        // ... фон и река
        
        // ТОЛЬКО боковые дорожки!
        // Левая дорожка
        this.drawPath(200, 420, 200, 320, 60);  // от башни игрока к мосту
        this.drawPath(200, 220, 200, 180, 60);  // от моста к башне врага
        
        // Правая дорожка  
        this.drawPath(700, 420, 700, 320, 60);
        this.drawPath(700, 220, 700, 180, 60);
        
        // НЕ РИСУЕМ центральную дорожку!
   
        
        // Река
        this.drawRiver();
    }
    
    drawPath(startX, startY, endX, endY, width) {
        this.ctx.save();
        const dx = endX - startX;
        const dy = endY - startY;
        const angle = Math.atan2(dy, dx);
        const length = Math.hypot(dx, dy);
        
        this.ctx.translate(startX, startY);
        this.ctx.rotate(angle);
        this.drawTiledImage('path', 0, -width/2, length, width, 50, 50);
        this.ctx.restore();
    }
    
    drawRiver() {
        const width = window.CONFIG.GAME.width;
        const centerY = window.CONFIG.GAME.height / 2;
        const riverWidth = 30;
        
        // Анимация воды
        this.waterOffset = (this.waterOffset + 0.03) % (Math.PI * 2);
        
        // Река
        this.drawTiledImage('river', 0, centerY - riverWidth/2, width, riverWidth, 50, riverWidth);
        
        // Блики
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let i = 0; i < 15; i++) {
            const waveY = Math.sin(this.waterOffset + i * 0.5) * 4;
            this.ctx.fillRect(30 + i * 60, centerY - 3 + waveY, 25, 3);

         // Волны
        for (let i = 0; i < 20; i++) {
            const waveY = Math.sin(this.waterOffset + i * 0.3) * 3;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + Math.sin(this.waterOffset) * 0.1})`;
            this.ctx.fillRect(30 + i * 40, centerY - 3 + waveY, 25, 2);
    }

    drawBridge(x, y) {
        const bridgeWidth = 80;
        const bridgeHeight = 20;
        const bridgeY = y - 10;
        
        // Тень моста
        this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
        this.ctx.fillRect(x - bridgeWidth/2 + 2, bridgeY + 2, bridgeWidth, bridgeHeight);
        
        // Основная часть
        this.ctx.fillStyle = '#8B5A2B';
        this.ctx.fillRect(x - bridgeWidth/2, bridgeY, bridgeWidth, bridgeHeight);
        
        // Доски
        this.ctx.fillStyle = '#A06B3A';
        for (let i = 0; i < 7; i++) {
            this.ctx.fillRect(x - bridgeWidth/2 + 5 + i * 10, bridgeY + 4, 6, 12);
        }
    }
    
    drawTower(tower, isPlayer) {
        if (!tower) return;
        
        const isDestroyed = tower.hp <= 0;
        const imgKey = isDestroyed 
            ? (isPlayer ? 'playerTowerDestroyed' : 'enemyTowerDestroyed')
            : (isPlayer ? 'playerTower' : 'enemyTower');
        
        this.drawImage(imgKey, tower.x - 35, tower.y - 50, 70, 80);
        
        if (!isDestroyed) {
            const percent = tower.hp / tower.maxHp;
            this.ctx.fillStyle = '#aa2e2e';
            this.ctx.fillRect(tower.x - 30, tower.y - 60, 60, 6);
            this.ctx.fillStyle = '#4eff6e';
            this.ctx.fillRect(tower.x - 30, tower.y - 60, 60 * percent, 6);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 10px monospace';
            this.ctx.fillText(`❤️ ${Math.floor(tower.hp)}`, tower.x - 20, tower.y - 63);
        }
    }
    
    drawKingTower(tower, isPlayer = true) {
        if (!tower) return;
        
        const isDestroyed = tower.hp <= 0;
        const imgKey = isDestroyed 
            ? (isPlayer ? 'kingTowerDestroyed' : 'kingEnemyTowerDestroyed')
            : (isPlayer ? 'kingTower' : 'kingEnemyTower');
        
        this.drawImage(imgKey, tower.x - 40, tower.y - 50, 80, 90);
        
        if (!isDestroyed) {
            const percent = tower.hp / tower.maxHp;
            this.ctx.fillStyle = '#aa2e2e';
            this.ctx.fillRect(tower.x - 35, tower.y - 60, 70, 6);
            this.ctx.fillStyle = '#4eff6e';
            this.ctx.fillRect(tower.x - 35, tower.y - 60, 70 * percent, 6);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 10px monospace';
            this.ctx.fillText(`❤️ ${Math.floor(tower.hp)}`, tower.x - 20, tower.y - 63);
        }
    }
    
    drawUnit(unit) {
        if (!unit || unit.hp <= 0) return;
        this.drawImage(unit.type, unit.x - 18, unit.y - 18, 36, 36);
        
        const percent = unit.hp / unit.maxHp;
        this.ctx.fillStyle = '#aa2e2e';
        this.ctx.fillRect(unit.x - 16, unit.y - 24, 32, 4);
        this.ctx.fillStyle = '#4eff6e';
        this.ctx.fillRect(unit.x - 16, unit.y - 24, 32 * percent, 4);
        
        this.ctx.fillStyle = unit.isPlayer ? '#4488ff' : '#ff4444';
        this.ctx.beginPath();
        this.ctx.arc(unit.x - 15, unit.y - 15, 4, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawUI(gameState, deck, selectedCardIndex, ui = null) {
        // Эликсир бар
        const elixirPercent = gameState.elixir / window.CONFIG.GAME.maxElixir;
        this.ctx.fillStyle = '#2c1a0e';
        this.ctx.fillRect(15, 10, 220, 22);
        this.ctx.fillStyle = '#d13aff';
        this.ctx.fillRect(15, 10, 220 * elixirPercent, 22);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 18px monospace';
        this.ctx.fillText(`⚡ ${Math.floor(gameState.elixir)}/${window.CONFIG.GAME.maxElixir}`, 25, 28);
        
        // СБРАСЫВАЕМ ОБЛАСТИ КАРТ
        this.lastCardAreas = [];
        
        // Отрисовка карт в руке
        if (deck && deck.hand && deck.hand.length > 0) {
            const cardWidth = 70;
            const cardHeight = 90;
            const startX = window.CONFIG.GAME.width / 2 - (cardWidth * deck.hand.length) / 2;
            const startY = window.CONFIG.GAME.height - 100;
            
            console.log(`Drawing ${deck.hand.length} cards at y=${startY}`);
            
            for (let i = 0; i < deck.hand.length; i++) {
                const card = deck.hand[i];
                const x = startX + i * (cardWidth + 10);
                const isSelected = (ui && ui.isPlacingMode && ui.selectedCardIndex === i);
                const canAfford = gameState.elixir >= card.cost;
                
                // Рамка карты
                this.ctx.fillStyle = isSelected ? '#ffd700' : '#333';
                this.ctx.fillRect(x - 3, startY - 3, cardWidth + 6, cardHeight + 6);
                
                // Фон карты
                this.ctx.fillStyle = canAfford ? '#1a1a2e' : '#2a2a3e';
                this.ctx.fillRect(x, startY, cardWidth, cardHeight);
                
                if (!canAfford) {
                    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
                    this.ctx.fillRect(x, startY, cardWidth, cardHeight);
                }
                
                this.drawImage(card.unitType, x + cardWidth/2 - 15, startY + 15, 30, 30);
                
                this.ctx.fillStyle = canAfford ? '#4eff6e' : '#ff6666';
                this.ctx.font = 'bold 16px monospace';
                this.ctx.fillText(`⚡${card.cost}`, x + 5, startY + 25);
                
                this.ctx.fillStyle = '#ffd700';
                this.ctx.font = '10px monospace';
                this.ctx.fillText(card.name, x + cardWidth/2 - 20, startY + 65);
                
                // СОХРАНЯЕМ ОБЛАСТЬ ДЛЯ КЛИКА
                this.lastCardAreas.push({
                    x: x,
                    y: startY,
                    width: cardWidth,
                    height: cardHeight,
                    card: card,
                    index: i
                });
            }
            
            console.log(`Saved ${this.lastCardAreas.length} card areas`);
        }
        
        if (ui && ui.isPlacingMode && ui.selectedCardIndex !== undefined) {
            const selectedCard = deck?.hand[ui.selectedCardIndex];
            if (selectedCard) {
                this.ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
                this.ctx.font = 'bold 12px monospace';
                this.ctx.fillText(`👉 Выбрано: ${selectedCard.name} (${selectedCard.cost}⚡)`, 
                    window.CONFIG.GAME.width / 2 - 100, 
                    window.CONFIG.GAME.height - 15);
            }
        }
    }
}

window.Graphics = null;
