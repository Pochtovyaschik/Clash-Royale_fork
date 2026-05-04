class Core{
    // подключение файлов
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.lastTime = 0;
        this.gameState = null;
        this.graphics = null
        this.soundFX = null
        this.ui = null
        this.ai = null
        this.animationId = null
    }

    
    // запуск игры 
    async init() {
        console.log("🎮инициализация игры...")
        

        this.graphics = new Graphics(this.ctx)
        this.soundFX = new SoundFX();
        this.gameState = new GameState();
        this.ui = new UI(this.canvas, this.gameState);
        this.ai = new AI(this.gameState);

        this.gameState.startBattle();
        this.lastTime = performance.now() / 1000;

        console.log('✅ Игра инициализирована!')
        this.startLoop();
    };
        

    // игровой цикл
    startLoop() {
        const gameloop = () => {
            const now = performance.now() / 1000;
            let delta = Math.min(0.033, now - this.lastTime);
            this.lastTime = now;
            this.update(delta, now);
            this.render();
            this.animationId = requestAnimationFrame(gameloop);

        };
        gameloop(); 
    }
    
    // расчёт отрисовки кадров(не доделан)
    render() {
        if (!this.graphics || !this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.graphics.drawArena();

        this.graphics.drawUI(this.gameState, this.ui);

        if (window.Effects) {
            window.Effects.draw();
        }
        // далее доделать ещё есть не все переменые...
    }

}