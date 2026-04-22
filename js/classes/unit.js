// ============================================================
// unit.js - Класс юнита
// ============================================================

class Unit {
    constructor(x, y, unitType, isPlayer, lane, card = null) {
        const stats = window.CONFIG.CARDS[unitType] || window.CONFIG.CARDS.knight;

        this.attackType = stats.attackType || 'melee';
        this.bridgeX = lane === 'left' ? 150 : 750;  // X координата моста
        this.hasCrossedBridge = false;

        this.x = x;
        this.y = y;
        this.type = unitType;
        this.isPlayer = isPlayer;
        this.lane = lane;
        this.card = card;
        
        // Характеристики из конфига
        this.hp = stats.hp;
        this.maxHp = stats.hp;
        this.damage = stats.damage;
        this.range = stats.range;
        this.speed = stats.speed;
        this.attackCooldown = 0;
        this.attackSpeed = stats.attackSpeed || 1.0;
        
        // Цель
        this.target = null;
        this.targetType = null; // 'unit', 'tower'
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
            }
            else {
                // Враг идет снизу вверх (от своих башен к мосту)
                if (this.y <= centerY + 30 && this.y >= centerY - 30) {
                    this.hasCrossedBridge = true;
                }
            }
        }

        // Обновляем кулдаун атаки
        if (this.attackCooldown > 0) {
            this.attackCooldown -= delta;
        }
        
        // Поиск цели
        this.findTarget(allUnits, towers);
        
        // Атака или движение
        if (this.target && this.attackCooldown <= 0) {
            this.attack();
        } else if (this.target) {
            // Двигаемся к цели
            this.moveToTarget();
        } else {
            // Двигаемся к вражеской башне
            this.moveToTower(towers);
        }
    }
    
    findTarget(allUnits, towers) {
        // Сначала ищем вражеских юнитов на той же дорожке
        let closestUnit = null;
        let closestDist = Infinity;
        
        for (let unit of allUnits) {
            if (unit.isPlayer !== this.isPlayer && unit.lane === this.lane && unit.hp > 0) {
                const dist = Math.hypot(this.x - unit.x, this.y - unit.y);
                if (dist < this.range && dist < closestDist) {
                    closestDist = dist;
                    closestUnit = unit;
                }
            }
        }
        
        if (closestUnit) {
            this.target = closestUnit;
            this.targetType = 'unit';
            return;
        }
        
        // Если нет юнитов, атакуем башню
        const targetTower = this.getTargetTower(towers);
        if (targetTower && targetTower.hp > 0) {
            const dist = Math.hypot(this.x - targetTower.x, this.y - targetTower.y);
            if (dist < this.range) {
                this.target = targetTower;
                this.targetType = 'tower';
                return;
            }
        }
        
        this.target = null;
        this.targetType = null;
    }
    
    getTargetTower(towers) {
        if (this.isPlayer) {
            // Игрок атакует вражеские башни
            if (towers.enemyLeft?.hp > 0 && this.lane === 'left') return towers.enemyLeft;
            if (towers.enemyRight?.hp > 0 && this.lane === 'right') return towers.enemyRight;
            return towers.enemyKing;
        } else {
            // Враг атакует башни игрока
            if (towers.playerLeft?.hp > 0 && this.lane === 'left') return towers.playerLeft;
            if (towers.playerRight?.hp > 0 && this.lane === 'right') return towers.playerRight;
            return towers.playerKing;
        }
    }
    
    attack() {
        if (!this.target) return;
        
        if (this.targetType === 'unit') {
            this.target.hp -= this.damage;
        } else if (this.targetType === 'tower') {
            this.target.hp = Math.max(0, this.target.hp - this.damage);
        }
        
        this.attackCooldown = this.attackSpeed;
        
        if (window.SoundFX) window.SoundFX.playHit();
        console.log(`⚔️ ${this.type} атакует ${this.targetType} на ${this.damage} урона`);
    }
    
    moveToTarget() {
        if (!this.target) return;
        
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);
        
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

window.Unit = null;
