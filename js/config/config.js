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
        kingTower: 'assets/images/towers/king_tower.png'
    },

    SOUNDS: {
        deploy: 'assets/souds/silent-short-click.mp3',
        hit: 'assets/souds/silent-short-click.mp3',
        deploy: 'assets/sounds/deploy.mp3',
        hit: 'assets/sounds/hit.mp3',
        towerHit: 'assets/sounds/tower_hit.mp3',
        victory: 'assets/sounds/victory.mp3',
        defeat: 'assets/sounds/defeat.mp3'

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
            player: { x: 425, y: 400 },
            enemy: { x: 425, y: 200 }
        }
    }
};
