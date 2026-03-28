// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ========== QA MODULE ==========
// QA - логирование и тесты
// Teams qa - Георгий (Posledniy-Georgiy), Тимур(t1mch1k12), Артме(melancholicpeoplearenotpeople)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// Глобальный объект браузера (окно вкладки)
window.QA = {
    log: function(msg) {
        console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
    },
    // поочередно проверяет наличие систем
    test: function() {
        this.log('=== QA Tests ===');
        this.log('Config loaded: ' + !!window.CONFIG);
        this.log('GameState loaded: ' + !!window.GameState);
        this.log('Graphics loaded: ' + !!window.Graphics);
        this.log('Core loaded: ' + !!window.Core);
        this.log('All systems ready!');
    }
};

// Авто-тест при загрузке
setTimeout(() => window.QA && window.QA.test(), 100);
