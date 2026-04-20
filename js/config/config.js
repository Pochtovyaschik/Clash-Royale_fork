// КОНФИГУРАЦИЯ - данные для всей игры
window.CONFIG = {
    // Пути к изображениям
    IMAGES: {
        path: 'assets/images/arena/path.png',
        grass: 'assets/images/arena/grass.png',
        river: 'assets/images/arena/river.png',
        knight: 'assets/images/units/knight.png',
        archer: 'assets/images/units/archer.png',
        mage: 'assets/images/units/mage.png',
        playerTower: 'assets/images/towers/player_tower.png',
        enemyTower: 'assets/images/towers/enemy_tower.png',
        kingTower: 'assets/images/towers/player_tower.png',
        kingEnemyTower: 'assets/images/towers/king_enemy_tower.png'
    },
    
    // Игровые параметры
    GAME: {
        width: 900,
        height: 600,
        maxElixir: 10,
        startElixir: 5,
        
        // Статы юнитов
        units: {
            knight: { cost: 3, name: 'Knight' },
            archer: { cost: 3, name: 'Archer' },
            mage: { cost: 4, name: 'Mage' }
        },
        
        // Позиции башен
        towers: {
            player: { x: 450, y: 540 },
            enemy: { x: 450, y: 60 }
        }
    }
};
