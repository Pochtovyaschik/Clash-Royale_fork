class Unit {
    constructor(x, y, unitType, isPlayer, lane, card = null) {
        // ... существующий код ...
        this.attackType = stats.attackType || 'melee';
        this.bridgeX = lane === 'left' ? 150 : 750;  // X координата моста
        this.hasCrossedBridge = false;
    }
    
    update(delta, allUnits, towers) {
        // Проверка перехода через мост
        const centerY = window.CONFIG.GAME.height / 2;
        
        if (!this.hasCrossedBridge) {
            // Юнит еще не перешел мост
            if (this.isPlayer) {
                // Игрок идет сверху вниз (от своих башен к мосту)
                if (this.y <= centerY + 30 && this.y >= centerY - 30) {
                    this.hasCrossedBridge = true;
                }
            } else {
                // Враг идет снизу вверх (от своих башен к мосту)
                if (this.y <= centerY + 30 && this.y >= centerY - 30) {
                    this.hasCrossedBridge = true;
                }
            }
        }
        
        // ... остальная логика update
    }
    
    moveToTarget() {
        if (!this.target) return;
        
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);
        
        // Для дальних юнитов - останавливаемся на дистанции атаки
        const stopDistance = this.attackType === 'ranged' ? this.attackRange * 0.8 : 15;
        
        if (dist > stopDistance) {
            // Движение только вдоль дорожки (X не меняется)
            const moveY = (dy / Math.abs(dy)) * this.speed;
            this.y += moveY;
            
            // Коррекция X для удержания на дорожке
            const targetX = this.bridgeX;
            const dxToBridge = targetX - this.x;
            if (Math.abs(dxToBridge) > 5) {
                this.x += Math.sign(dxToBridge) * Math.min(Math.abs(dxToBridge), this.speed);
            }
        }
    }
    
    moveToTower(towers) {
        const targetTower = this.getTargetTower(towers);
        if (!targetTower) return;
        
        const dy = targetTower.y - this.y;
        
        if (Math.abs(dy) > 5) {
            const moveY = Math.sign(dy) * this.speed;
            this.y += moveY;
            
            // Коррекция X для удержания на дорожке
            const dxToBridge = this.bridgeX - this.x;
            if (Math.abs(dxToBridge) > 5) {
                this.x += Math.sign(dxToBridge) * Math.min(Math.abs(dxToBridge), this.speed);
            }
        }
    }
}
