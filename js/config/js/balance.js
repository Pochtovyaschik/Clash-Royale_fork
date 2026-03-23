// Balance Module - настройки баланса игры
window.Balance = {
    // Статы юнитов
    units: {
        knight: {
            name: 'Knight',
            cost: 3,
            hp: 850,
            damage: 80,
            range: 45,
            speed: 85,
            attackSpeed: 1.0,
            description: 'Tanky melee fighter'
        },
        archer: {
            name: 'Archer',
            cost: 3,
            hp: 480,
            damage: 65,
            range: 130,
            speed: 90,
            attackSpeed: 0.9,
            description: 'Long range support'
        },
        mage: {
            name: 'Mage',
            cost: 4,
            hp: 580,
            damage: 115,
            range: 120,
            speed: 80,
            attackSpeed: 1.2,
            description: 'High damage caster'
        }
    },
    
    // Статы башен
    towers: {
        player: { hp: 1500, damage: 50, attackSpeed: 0.8, range: 200 },
        enemy: { hp: 1500, damage: 50, attackSpeed: 0.8, range: 200 },
        king: { hp: 2000, damage: 80, attackSpeed: 0.6, range: 250 }
    },
    
    // Игровые параметры
    game: {
        elixirRegen: 0.7,
        startElixir: 5,
        maxElixir: 10,
        matchDuration: 180 // 3 минуты
    },
    
    // Получить статы юнита
    getUnit: function(type) {
        return this.units[type] || this.units.knight;
    },
    
    // Получить статы башни
    getTower: function(towerType) {
        return this.towers[towerType] || this.towers.player;
    },
    
    // Обновить конфиг (для настройки)
    updateConfig: function() {
        if (window.Config) {
            if (!Config.game) Config.game = {};
            Config.game.elixirRegen = this.game.elixirRegen;
            Config.game.startElixir = this.game.startElixir;
            Config.game.maxElixir = this.game.maxElixir;
        }
    },
    
    // Вывод баланса в консоль
    logBalance: function() {
        console.log('⚖️ === Balance Settings ===');
        console.log('Units:');
        for (let key in this.units) {
            const u = this.units[key];
            console.log(`  ${u.name}: ${u.cost}⚡ | ${u.hp}❤️ | ${u.damage}💥 | ${u.range}📏`);
        }
        console.log('Towers:');
        console.log(`  Player Tower: ${this.towers.player.hp}❤️`);
        console.log(`  Enemy Tower: ${this.towers.enemy.hp}❤️`);
        console.log(`Game: ${this.game.elixirRegen}⚡/sec | ${this.game.startElixir} start`);
        console.log('⚖️ ====================');
    }
};

// Инициализация
Balance.updateConfig();
Balance.logBalance();
