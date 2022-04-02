const canvas = document.getElementById('chess');
const ctx = canvas.getContext('2d');

const offsetX = canvas.offsetLeft
const offsetY = canvas.offsetTop

const width = height = 800
const dpr = window.devicePixelRatio;
const chessBlockSize = 100 * dpr;

canvas.style.width = `${width}px`;
canvas.style.height = `${width}px`;

canvas.width = width * dpr;
canvas.height = height * dpr;

// 체스판 그리기
const boardWithPieces = []
const diedPieces = [];

function makeChessBoard(matrix) {
    if (!matrix.length) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const color = ((i + j) % 2 === 0) ? '#fece9e' : '#d18a48';

                let piece = null

                // 양쪽 폰 그리기
                if (i === 1) {
                    piece = {
                        name: 'PAWN',
                        team: 'BLACK',
                        position: [1000, 200, 200, 200],
                    }
                } else if (i === 6) {
                    piece = {
                        name: 'PAWN',
                        team: 'WHITE',
                        position: [1000, 0, 200, 200],
                    }

                // 양쪽 룩 그리기
                } else if (i === 0 && (j === 0 || j === 7)) {
                    piece = {
                        name: 'ROOK',
                        team: 'BLACK',
                        position: [800, 200, 200, 200],
                    }
                } else if (i === 7 && (j === 0 || j === 7)) {
                    piece = {
                        name: 'ROOK',
                        team: 'WHITE',
                        position: [800, 0, 200, 200],
                    }
                
                // 양쪽 나이트 그리기
                } else if (i === 0 && (j === 1 || j === 6)) {
                    piece = {
                        name: 'KNIGHT',
                        team: 'BLACK',
                        position: [600, 200, 200, 200],
                    }
                } else if (i === 7 && (j === 1 || j === 6)) {
                    piece = {
                        name: 'KNIGHT',
                        team: 'WHITE',
                        position: [600, 0, 200, 200],
                    }

                // 양쪽 비숍 그리기
                } else if (i === 0 && (j === 2 || j === 5)) {
                    piece = {
                        name: 'BISHOP',
                        team: 'BLACK',
                        position: [400, 200, 200, 200],
                    }
                } else if (i === 7 && (j === 2 || j === 5)) {
                    piece = {
                        name: 'BISHOP',
                        team: 'WHITE',
                        position: [400, 0, 200, 200],
                    }
                } else if (i === 0 && j === 3) {
                    piece = {
                        name: 'QUEEN',
                        team: 'BLACK',
                        position: [0, 200, 200, 200],
                    }
                } else if (i === 7 && j === 3) {
                    piece = {
                        name: 'KING',
                        team: 'WHITE',
                        position: [200, 0, 200, 200],
                    }
                } else if (i === 0 && j === 4) {
                    piece = {
                        name: 'KING',
                        team: 'BLACK',
                        position: [200, 200, 200, 200],
                    }
                } else if (i === 7 && j === 4) {
                    piece = {
                        name: 'QUEEN',
                        team: 'WHITE',
                        position: [0, 0, 200, 200],
                    }
                }


                matrix.push([
                    [chessBlockSize * j, chessBlockSize * i, chessBlockSize, chessBlockSize, color],
                    piece
                ]);

            }
        }
    }

    const piecesImage = document.getElementById('chess-pieces');

    matrix.forEach(block => {
        ctx.fillStyle = block[0][4]
        ctx.fillRect(...(block[0]));

        if (block[1]) {
            ctx.drawImage(
                piecesImage,
                ...[...block[1]['position'], ...(block[0])]
            )
        }
    })
}

makeChessBoard(boardWithPieces)

let selected = null;

canvas.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const mouseX = parseInt(e.clientX - offsetX);
    const mouseY = parseInt(e.clientY - offsetY);

    const dx = mouseX * dpr
    const dy = mouseY * dpr

    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillRect(dx, dy, 10, 10);

    const clickedBlock = boardWithPieces.find((block) => {
        const blockPosition = block[0];

        if ((dx < blockPosition[0] + chessBlockSize) && (dy < blockPosition[1] + chessBlockSize)) {
            return block
        }
    })

    if (clickedBlock[1]) {
        // 말을 선택한 경우
        if (selected) {
            // 이전에 선택한 말이 존재할 경우
            if (selected[1].team === clickedBlock[1].team) {
                // 이전과 지금 선택한 말이 같은 진영일 경우 그냥 리턴
                selected = null;
                return
            }
            clickedBlock[1] = selected[1]
            selected[1] = null
            selected = null;
            makeChessBoard(boardWithPieces)

            return;
            // 아니라면 이전에 선택한 말을 해당 위치로 옮긴다.
            // 삭제된 말은 따로 죽은 리스트에 넣어둔다.
        }

        selected = clickedBlock
    } else {
        if (!clickedBlock[1]) {
            return;
        }
        
        // 말을 선택한 뒤 블록을 선택 경우
        clickedBlock[1] = selected[1]
        selected[1] = null
        selected = null;
        makeChessBoard(boardWithPieces)
    }
})