window.AI = {
    lastDeployTime: 0,
    deployDelay: 3.0,
    initialDelay: 3,
    gameStartTime: 0,
    
    update: function(now) {
        if (!GameState.isActive) return;
        
        if (this.gameStartTime === 0) {
            this.gameStartTime = now;
            return;
        }
        
        if (now - this.gameStartTime < this.initialDelay) return;
        
        if (this.lastDeployTime === 0) {
            this.lastDeployTime = now;
            return;
        }
        
        if (now - this.lastDeployTime >= this.deployDelay) {
            const enemyUnits = GameState.getUnits().filter(u => !u.isPlayer).length;
            
            if (GameState.elixir >= 3 && enemyUnits < 5) {
                function getLaneStrength(units, isPlayer, isLeft) {
                    return units
                        .filter(u => u.isPlayer === isPlayer)
                        .filter(u => isLeft ? u.x < CONFIG.GAME.width / 2 : u.x >= CONFIG.GAME.width / 2)
                        .reduce((sum, u) => sum + u.hp, 0);
                }
                
                const units = GameState.getUnits();
                
                // считаем силу ИГРОКА (врага для AI)
                const leftStrength = getLaneStrength(units, true, true);
                const rightStrength = getLaneStrength(units, true, false);
                
                // выбираем более слабую линию
                const lane = leftStrength <= rightStrength ? 'left' : 'right';
                const x = lane === 'left' ? 
                    CONFIG.GAME.spawn.leftX : 
                    CONFIG.GAME.spawn.rightX;
                
                const types = ['knight', 'archer', 'mage'];
                let type = types[Math.floor(Math.random() * 3)];
                let cost = CONFIG.GAME.units[type].cost;
                
                if (GameState.elixir < cost) {
                    if (GameState.elixir >= 3) {
                        type = 'knight';
                        cost = CONFIG.GAME.units.knight.cost;
                    } else {
                        return;
                    }
                }
                
                const stats = CONFIG.GAME.units[type];
                const unit = {
                    x: x,
                    y: CONFIG.GAME.spawn.enemyY,
                    type: type,
                    isPlayer: false,
                    lane: lane,
                    hp: stats.hp,
                    maxHp: stats.hp,
                    damage: stats.damage,
                    range: stats.range,
                    speed: stats.speed,
                    attackTimer: 0
                };
                
                if (GameState.deployUnit(unit)) {
                    this.lastDeployTime = now;
                    console.log(`AI deployed ${type} on ${lane} lane`);
                    if (window.SoundFX) window.SoundFX.play('deploy');
                }
            }
        }
    },
    
    reset: function() {
        this.lastDeployTime = 0;
        this.gameStartTime = 0;
    }
};
