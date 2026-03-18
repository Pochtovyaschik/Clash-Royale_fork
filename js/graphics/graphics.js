window.drawBridge = function(ctx) {
    const canvas = ctx.canvas;
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(350, 250, 100, 100);
    ctx.strokeStyle = '#d2691e';
    ctx.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(350, 250 + i * 20);
        ctx.lineTo(450, 250 + i * 20);
        ctx.stroke();
    }
}
