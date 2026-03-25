// СОСТОЯНИЕ - данные игры TEAM-Game state 82v(Вадим)
window.GameState = {
    isActive: false,
    elixir: 5,
    playerTowerHP: 1500,
    enemyTowerHP: 1500,
    selectedUnit: 'knight',
    units: [],
    // функция HP elixir, units
    startBattle: function() {
        this.isActive = true;
        this.playerTowerHP = 1500;
        this.enemyTowerHP = 1500;
        this.elixir = 5;
        this.units = [];
        console.log('Battle started!');
    },
    // функция победителя
    endBattle: function(winner) {
        this.isActive = false;
        console.log(winner === 'player' ? 'Victory!' : 'Defeat!');
    },
    
    getUnits: function() {
        return this.units;
    }
};
