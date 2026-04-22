// ============================================================
// ui.js - Обработка пользовательского ввода (ОБНОВЛЕНО)
// ============================================================

class UI {
    constructor(canvas, gameState, deck) {
        this.canvas = canvas;
        this.gameState = gameState;
        this.deck = deck;
        this.selectedCardIndex = 0;
        this.setupEventListeners();
        this.setupResetButton();
        this.isPlacingMode = false; // Режим размещения юнита
    }
    
    setupEventListeners() {
        // Клик по канвасу для призыва юнита (ТОЛЬКО если выбран активный режим)
        this.canvas.addEventListener('click', (e) => {
            if (!this.gameState.isActive) return;
            
            // Если не в режиме размещения - ничего не делаем
            if (!this.isPlacingMode) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            
            const canvasX = (e.clientX - rect.left) * scaleX;
            const canvasY = (e.clientY - rect.top) * scaleY;
            
            // Проверяем, что клик на нижней половине (игрок может ставить только на своей стороне)
            if (canvasY > window.CONFIG.GAME.height / 2) {
                this.deployAtPosition(canvasX, canvasY);
            }
        });
        
        // Убираем старую обработку цифр, теперь выбор через клик по картам
        // Карты теперь кликабельны на canvas
    }
    
    // Новый метод: обработка клика по карте в руке
    handleCardClick(index, card) {
        if (!this.gameState.isActive) return;
        
        // Проверяем, хватает ли эликсира
        if (!this.gameState.canDeploy(card.cost)) {
            console.log(`❌ Не хватает эликсира! Нужно ${card.cost}, есть ${Math.floor(this.gameState.elixir)}`);
            // Визуальная обратная связь
            if (window.Effects) {
                window.Effects.screenFlash('255,0,0', 0.2);
            }
            return;
        }
        
        // Выбираем карту и активируем режим размещения
        this.selectedCardIndex = this.deck.hand.indexOf(card);
        this.isPlacingMode = true;
        this.gameState.selectedCardIndex = this.selectedCardIndex;
        
        // Визуальная обратная связь - подсветка карты в graphics.js
        
        console.log(`🃏 Выбрана карта ${card.name} (${card.cost}⚡). Кликните на арене для призыва.`);
        
        // Сброс режима размещения через 5 секунд
        if (this.placementTimeout) clearTimeout(this.placementTimeout);
        this.placementTimeout = setTimeout(() => {
            this.isPlacingMode = false;
            console.log('⏰ Режим размещения отменен');
        }, 5000);
    }
    
    setupResetButton() {
        const btnReset = document.getElementById('btnReset');
        if (btnReset) {
            btnReset.onclick = () => {
                this.gameState.startBattle();
                if (this.deck) this.deck.resetCycle();
                this.selectedCardIndex = 0;
                this.isPlacingMode = false;
                console.log('🔄 Новая битва!');
            };
        }
    }
    
    deployAtPosition(x, y) {
    const card = this.deck.getCard(this.selectedCardIndex);
    if (!card) {
        this.isPlacingMode = false;
        return;
    }
    
    if (!this.gameState.canDeploy(card.cost, true)) {
        if (window.Effects) window.Effects.addInsufficientEffect(x, y);
        this.isPlacingMode = false;
        return;
    }
    
    // Проверка типа карты
    if (card.type === 'spell') {
        // Применяем заклинание
        const spell = new Spell(card.id, card);
        const hitCount = spell.cast(x, y, this.gameState);
        
        if (hitCount > 0) {
            this.gameState.spendElixir(card.cost, true);
            this.deck.useCard(this.selectedCardIndex);
            if (window.SoundFX) window.SoundFX.playSpell();
        }
        
        this.isPlacingMode = false;
        return;
    }
    
    // Существующий код для юнитов...
    const lane = x < window.CONFIG.GAME.width / 2 ? 'left' : 'right';
    }
    
    updateSelectedCard(index) {
        this.selectedCardIndex = index;
        if (this.gameState) {
            this.gameState.selectedCardIndex = index;
        }
    }
    
    // Новый метод для отмены режима размещения
    cancelPlacement() {
        this.isPlacingMode = false;
        if (this.placementTimeout) clearTimeout(this.placementTimeout);
        console.log('❌ Режим размещения отменен');
    }
}

window.UI = null;
