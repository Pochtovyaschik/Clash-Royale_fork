const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function helloQA() {
    console.log("Integration & QA ready ✅");
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Здесь будут вызовы
    
    requestAnimationFrame(gameLoop);
}

helloQA()

gameLoop();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Арена
    drawArena(ctx);
    drawRiver(ctx);
    drawBridge(ctx);
    
    // Башни
    drawPlayerTower(ctx, 150, 400);
    drawEnemyTower(ctx, 650, 400);
    drawKingTower(ctx, 400, 200, true);
    
    requestAnimationFrame(gameLoop);
}
