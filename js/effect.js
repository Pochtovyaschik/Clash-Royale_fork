1)Асадов Маджнун-spawn
// Функция для эффекта появления
window.drawSpawnEffect = function(ctx, x, y) {
    // TODO: Расходящиеся круги
    
    ctx.strokeStyle = '#ffffff';
    
    for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(x, y, i * 8, 0, Math.PI * 2);
        ctx.stroke();
    }
}
