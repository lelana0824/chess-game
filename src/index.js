const canvas = document.getElementById('chess');
const ctx = canvas.getContext('2d');

const width = height = 800
const dpr = window.devicePixelRatio;
const chessBlockSize = 100 * dpr;

canvas.style.width = `${width}px`;
canvas.style.height = `${width}px`;

canvas.width =  width * dpr;
canvas.height = height * dpr;

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        ctx.fillStyle = ((i + j) % 2 === 0) ? '#fece9e' : '#d18a48';
        ctx.fillRect(chessBlockSize * j, chessBlockSize * i, chessBlockSize, chessBlockSize);

        // 양쪽 폰 그리기
        ctx.drawImage(
            document.getElementById('chess-pieces'),
            1000, 200, 200, 200, chessBlockSize * j, chessBlockSize * 1, chessBlockSize, chessBlockSize
        )
        ctx.drawImage(
            document.getElementById('chess-pieces'),
            1000, 0, 200, 200, chessBlockSize * j, chessBlockSize * 6, chessBlockSize, chessBlockSize
        )

        // 양쪽 룩 그리기
        if (j === 0 || j === 7) {
            ctx.drawImage(
                document.getElementById('chess-pieces'),
                800, 200, 200, 200, chessBlockSize * j, chessBlockSize * 0, chessBlockSize, chessBlockSize
            )
            ctx.drawImage(
                document.getElementById('chess-pieces'),
                800, 0, 200, 200, chessBlockSize * j, chessBlockSize * 7, chessBlockSize, chessBlockSize
            )
        }

        // 양쪽 나이트 그리기
        if (j === 1 || j === 6) {
            ctx.drawImage(
                document.getElementById('chess-pieces'),
                600, 200, 200, 200, chessBlockSize * j, chessBlockSize * 0, chessBlockSize, chessBlockSize
            )
            ctx.drawImage(
                document.getElementById('chess-pieces'),
                600, 0, 200, 200, chessBlockSize * j, chessBlockSize * 7, chessBlockSize, chessBlockSize
            )
        }

        // 양쪽 비숍 그리기
        if (j === 2 || j === 5) {
            ctx.drawImage(
                document.getElementById('chess-pieces'),
                400, 200, 200, 200, chessBlockSize * j, chessBlockSize * 0, chessBlockSize, chessBlockSize
            )
            ctx.drawImage(
                document.getElementById('chess-pieces'),
                400, 0, 200, 200, chessBlockSize * j, chessBlockSize * 7, chessBlockSize, chessBlockSize
            )
        }

        // 양쪽 왕과 여왕 그리기 (플레이어 기준에 맞춰 왕, 여왕 배치)
        if (j === 3) {
            ctx.drawImage(
                document.getElementById('chess-pieces'),
                0, 200, 200, 200, chessBlockSize * j, chessBlockSize * 0, chessBlockSize, chessBlockSize
            )
            ctx.drawImage(
                document.getElementById('chess-pieces'),
                200, 0, 200, 200, chessBlockSize * j, chessBlockSize * 7, chessBlockSize, chessBlockSize
            )
        }

        if (j === 4) {
            ctx.drawImage(
                document.getElementById('chess-pieces'),
                200, 200, 200, 200, chessBlockSize * j, chessBlockSize * 0, chessBlockSize, chessBlockSize
            )
            ctx.drawImage(
                document.getElementById('chess-pieces'),
                0, 0, 200, 200, chessBlockSize * j, chessBlockSize * 7, chessBlockSize, chessBlockSize
            )
        }
    }
}

