// ============================================================
// main.js - Точка входа в игру
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Clash Royale - Stage 1');
    
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('❌ Canvas не найден!');
        return;
    }
     // Установка размеров canvas
    canvas.width = window.CONFIG.GAME.width;
    canvas.height = window.CONFIG.GAME.height;
    const ctx = canvas.getContext('2d');
  
     // Создание и запуск ядра игры
    const core = new Core(canvas, ctx);
    await core.init();
  
      // Глобальные объекты для доступа из консоли (для отладки)
    window.gameCore = core;
    window.gameState = core.gameState;
    window.gameGraphics = core.graphics;
    
    console.log('🎮 Игра запущена!');
  
    Graphics.init(ctx);
    UI.init(canvas);
    SoundFX.init();
    GameState.startBattle();
    Core.startLoop();
    
    function render() {
        Graphics.drawArena();
        Graphics.drawPlayerLeftTower();
        Graphics.drawPlayerRightTower();
        Graphics.drawEnemyLeftTower();
        Graphics.drawEnemyRightTower();
        Graphics.drawKingTower(true);
        Graphics.drawKingTower(false);
        
        const units = GameState.getUnits();
        for (let i = 0; i < units.length; i++) {
            Graphics.drawUnit(units[i]);
        }
        
        Graphics.drawUI();
        requestAnimationFrame(render);
    }
    
    render();
    console.log('Stage 3: Complete Clash Royale with lanes, towers, and sounds!');
})
    

