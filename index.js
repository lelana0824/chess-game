const canvas = document.getElementById('chess');
const ctx = canvas.getContext('2d');

const width = height = 800
const dpr = window.devicePixelRatio;

canvas.style.width = `${width}px`;
canvas.style.height = `${width}px`;

canvas.width =  width * dpr;
canvas.height = height * dpr;

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        ctx.fillStyle = ((i + j) % 2 === 0) ? 'gray' : 'green';
        ctx.fillRect(200 * j, 200 * i, 100 * dpr, 100 * dpr);
    }
}

