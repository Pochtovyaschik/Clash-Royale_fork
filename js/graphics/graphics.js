

window.drawRiver = function(ctx) {
    ctx.fillStyle = '#4169e1';
    ctx.globalAlpha = 0.3;
    ctx.fillRect(300, 0, 200, 600);
    ctx.strokeStyle = '#87ceeb';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    for (let y = 50; y < 600; y += 50) {
        ctx.beginPath();
        ctx.moveTo(320, y);
        ctx.quadraticCurveTo(400, y + 20, 480, y);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}
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


window.drawRiver = function(ctx) {
    ctx.fillStyle = '#4169e1';
    ctx.globalAlpha = 0.3;
    ctx.fillRect(300, 0, 200, 600);
    ctx.strokeStyle = '#87ceeb';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    for (let y = 50; y < 600; y += 50) {
        ctx.beginPath();
        ctx.moveTo(320, y);
        ctx.quadraticCurveTo(400, y + 20, 480, y);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}
    
  
window.drawArena = function(ctx) {
    ctx.fillStyle = '#228b22';
    ctx.fillRect(0, 0, 800, 600);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(400, 300, 50, 0, Math.PI * 2);
    ctx.stroke();

}

