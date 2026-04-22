class GameState {
    constructor() {
        this.isActive = false;
        this.playerElixir = 5;     // Эликсир игрока
        this.aiElixir = 5;         // Эликсир ИИ
        this.units = [];
        this.towers = { ... };
        this.lastPlayerElixirTime = 0;
        this.lastAIElixirTime = 0;
        this.selectedCardIndex = 0;
        this.selectedCard = null;
    }
    
    startBattle() {
        this.isActive = true;
        this.playerElixir = window.CONFIG.GAME.startElixir;
        this.aiElixir = window.CONFIG.GAME.startElixir;
        this.units = [];
        this.lastPlayerElixirTime = performance.now() / 1000;
        this.lastAIElixirTime = performance.now() / 1000;
        // ... остальная инициализация
    }
    
    updateElixir(now, isPlayer = true) {
        if (!this.isActive) return;
        
        const lastTime = isPlayer ? this.lastPlayerElixirTime : this.lastAIElixirTime;
        const delta = now - lastTime;
        
        if (delta >= window.CONFIG.GAME.elixirRegenRate) {
            if (isPlayer) {
                this.playerElixir = Math.min(this.playerElixir + 1, window.CONFIG.GAME.maxElixir);
                this.lastPlayerElixirTime = now;
            } else {
                this.aiElixir = Math.min(this.aiElixir + 1, window.CONFIG.GAME.maxElixir);
                this.lastAIElixirTime = now;
            }
        }
    }
    
    canDeploy(cost, isPlayer = true) {
        const elixir = isPlayer ? this.playerElixir : this.aiElixir;
        return this.isActive && elixir >= cost;
    }
    
    spendElixir(cost, isPlayer = true) {
        if (isPlayer) {
            this.playerElixir -= cost;
        } else {
            this.aiElixir -= cost;
        }
    }
    
    deployUnit(unit, isPlayer = true) {
        const cost = unit.card ? unit.card.cost : window.CONFIG.CARDS[unit.type].cost;
        
        if (!this.canDeploy(cost, isPlayer)) {
            return false;
        }
        
        this.units.push(unit);
        this.spendElixir(cost, isPlayer);
        return true;
    }
}
