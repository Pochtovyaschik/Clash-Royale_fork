
// Main Entry Point - финальная интеграция всех модулей
(function() {
    console.log('🎮 Clash Royale Mini - Initializing...');
    console.log('═══════════════════════════════');
    
    // Функция инициализации после загрузки DOM
    function init() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        // 1. Инициализация QA (должен быть первым для логирования)
        if (window.QA) {
            QA.init();
            QA.log('QA System Online', 'success');
        }
        
        // 2. Инициализация Config
        if (window.Config) {
            QA.log('Config loaded', 'success');
        }
        
        // 3. Инициализация Balance
        if (window.Balance) {
            Balance.updateConfig();
            QA.log('Balance system ready', 'success');
        }
        
        // 4. Инициализация Core (игровой цикл)
        if (window.Core) {
            Core.init('gameCanvas');
            QA.log('Core engine started', 'success');
        }
        
        // 5. Инициализация Graphics
        if (window.Graphics) {
            Graphics.init(ctx);
            QA.log('Graphics system ready', 'success');
        }
        
        // 6. Инициализация Effects
        if (window.Effects) {
            Effects.init(ctx);
            QA.log('Effects system ready', 'success');
        }
        
        // 7. Инициализация Sound
        if (window.SoundFX) {
            SoundFX.init();
            QA.log('Sound system ready', 'success');
        }
        
        // 8. Инициализация State
        if (window.GameState) {
            GameState.setState('menu');
            QA.log('GameState initialized', 'success');
        }
        
        // 9. Инициализация UI
        if (window.UI) {
            UI.init();
            QA.log('UI initialized', 'success');
        }
        
        // 10. Инициализация Input
        if (window.Input) {
            Input.init(canvas);
            QA.log('Input system ready', 'success');
        }
        
        // 11. Инициализация AI
        if (window.AI) {
            AI.init();
            QA.log('AI system ready', 'success');
        }
        
        // 12. Запуск тестов через 1 секунду
        setTimeout(() => {
            if (window.QA) {
                QA.runAllTests();
            }
            
            console.log('═══════════════════════════════');
            console.log('✨ ALL SYSTEMS READY!');
            console.log('📖 Instructions:');
            console.log('   1. Click "Start Battle"');
            console.log('   2. Select a unit (Knight/Archer/Mage)');
            console.log('   3. Click on BOTTOM half to deploy');
            console.log('   4. AI will deploy units from top');
            console.log('═══════════════════════════════');
            
            if (window.UI) {
                UI.showMessage('🎮 Game Ready! Click "Start Battle"', 3000);
            }
        }, 1000);
    }
    
    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
