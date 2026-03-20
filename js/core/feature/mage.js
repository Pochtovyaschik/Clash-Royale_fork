// Функция для рисования мага
window.drawMage = function(ctx, x, y, isPlayer) {
const color = isPlayer ? '#3a6ea5' : '#a53a3a';

// Мантия
ctx.fillStyle = color;
ctx.beginPath();
ctx.arc(x, y - 4, 10, 0, Math.PI * 2);
ctx.fill();

// Шляпа
ctx.fillStyle = '#663399';
ctx.beginPath();
ctx.moveTo(x - 8, y - 20);
ctx.lineTo(x, y - 35);
ctx.lineTo(x + 8, y - 20);
ctx.fill();

// Магический шар
ctx.fillStyle = '#ffd700';
ctx.beginPath();
ctx.arc(x + 15, y - 15, 5, 0, Math.PI * 2);
ctx.fill();
}

// Общая функция для войск
window.drawTroop = function(ctx, x, y, type, isPlayer) {
if (type === 'knight') window.drawKnight(ctx, x, y, isPlayer);
if (type === 'archer') window.drawArcher(ctx, x, y, isPlayer);
if (type === 'mage') window.drawMage(ctx, x, y, isPlayer);
}

<canvas id="testCanvas" width="800" height="400"></canvas>
<script>
    const canvas = document.getElementById('testCanvas');
    const ctx = canvas.getContext('2d');
    
    // Очистка холста
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем все типы войск
    drawTroop(ctx, 200, 200, 'knight', true);   // Рыцарь (игрок)
    drawTroop(ctx, 400, 200, 'archer', true);  // Лучник (игрок)
    drawTroop(ctx, 600, 200, 'mage', true);    // Маг (игрок)
</script>
