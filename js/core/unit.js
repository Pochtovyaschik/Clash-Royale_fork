// ============================================================
// unit.js - Класс юнита
// ============================================================

/**
 * Класс, представляющий боевого юнита на игровом поле.
 * Отвечает за перемещение, поиск цели и атаку.
 */
class Unit {
    /**
     * Создаёт новый экземпляр юнита.
     * @param {number} x - Начальная координата X.
     * @param {number} y - Начальная координата Y.
     * @param {string} unitType - Тип юнита (ключ в CONFIG.CARDS).
     * @param {boolean} isPlayer - Принадлежность юнита (true - игрок, false - враг).
     * @param {string} lane - Дорожка движения ('left', 'right').
     * @param {Object|null} [card=null] - Карточка, вызвавшая юнита.
     */
    constructor(x, y, unitType, isPlayer, lane, card = null) {
        const stats = window.CONFIG.CARDS[unitType] || window.CONFIG.CARDS.knight;

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
        /**
         * Текущая цель атаки (юнит или башня).
         * @type {Object|null}
         */
        this.target = null;
        /**
         * Тип текущей цели ('unit' или 'tower').
         * @type {string|null}
         */
        this.targetType = null; 
    }

    /**
     * Основной метод обновления состояния юнита (вызывается каждый кадр).
     * Обновляет кулдаун, ищет цель и инициирует атаку или движение.
     * @param {number} delta - Время с последнего кадра (в секундах).
     * @param {Array} allUnits - Массив всех юнитов на поле.
     * @param {Object} towers - Объект с башнями.
     */
    update(delta, allUnits, towers) {
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

    /**
     * Ищет цель для атаки: сначала вражеских юнитов на той же дорожке, затем башню.
     * @param {Array} allUnits - Массив всех юнитов.
     * @param {Object} towers - Объект с башнями.
     */
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

    /**
     * Определяет целевую башню для атаки в зависимости от стороны и дорожки.
     * @param {Object} towers - Объект с башнями.
     * @returns {Object|null} Целевая башня или null.
     */
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

    /**
     * Наносит урон текущей цели и сбрасывает кулдаун атаки.
     */
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

    /**
     * Перемещает юнита к текущей цели.
     */
    moveToTarget() {
        if (!this.target) return;
        
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist > 5) {
            const moveX = (dx / dist) * this.speed;
            const moveY = (dy / dist) * this.speed;
            this.x += moveX;
            this.y += moveY;
        }
    }

    /**
     * Перемещает юнита к башне на его дорожке.
     * @param {Object} towers - Объект с башнями.
     */
    moveToTower(towers) {
        const targetTower = this.getTargetTower(towers);
        if (!targetTower) return;
        
        const dx = targetTower.x - this.x;
        const dy = targetTower.y - this.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist > 5) {
            const moveX = (dx / dist) * this.speed;
            const moveY = (dy / dist) * this.speed;
            this.x += moveX;
            this.y += moveY;
        }
    }
}

window.Unit = Unit; // Экспортируем класс в глобальную область видимости
