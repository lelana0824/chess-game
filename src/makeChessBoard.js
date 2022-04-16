const WHITE_CHESS_PIECE_COLOR = '#fece9e';
const BLACK_CHESS_PIECE_COLOR = '#d18a48';
const piecesImage = document.getElementById('chess-pieces');

function drawChessBoard(board) {
    if (!board.length) {
        initChessBoard(board);
    }

    board.forEach(square => {
        ctx.fillStyle = square.square.color;
        ctx.fillRect(...square.square.position);

        if (square.piece) {
            ctx.drawImage(
                piecesImage,
                ...[...square.piece.position, ...square.square.position]
            );
        }
    });
}

function initChessBoard(board) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const color = ((i + j) % 2 === 0) ? WHITE_CHESS_PIECE_COLOR : BLACK_CHESS_PIECE_COLOR;

            let piece = null;

            // 양쪽 폰 그리기
            if (i === 1) {
                piece = {
                    name: 'PAWN',
                    team: 'BLACK',
                    position: [1000, 200, 200, 200],
                    moveHistory: [],
                };
            } else if (i === 6) {
                piece = {
                    name: 'PAWN',
                    team: 'WHITE',
                    position: [1000, 0, 200, 200],
                    moveHistory: [],
                };

                // 양쪽 룩 그리기
            } else if (i === 0 && (j === 0 || j === 7)) {
                piece = {
                    name: 'ROOK',
                    team: 'BLACK',
                    position: [800, 200, 200, 200],
                    moveHistory: [],
                };
            } else if (i === 7 && (j === 0 || j === 7)) {
                piece = {
                    name: 'ROOK',
                    team: 'WHITE',
                    position: [800, 0, 200, 200],
                    moveHistory: [],
                };

                // 양쪽 나이트 그리기
            } else if (i === 0 && (j === 1 || j === 6)) {
                piece = {
                    name: 'KNIGHT',
                    team: 'BLACK',
                    position: [600, 200, 200, 200],
                    moveHistory: [],
                };
            } else if (i === 7 && (j === 1 || j === 6)) {
                piece = {
                    name: 'KNIGHT',
                    team: 'WHITE',
                    position: [600, 0, 200, 200],
                    moveHistory: [],
                };

                // 양쪽 비숍 그리기
            } else if (i === 0 && (j === 2 || j === 5)) {
                piece = {
                    name: 'BISHOP',
                    team: 'BLACK',
                    position: [400, 200, 200, 200],
                    moveHistory: [],
                };
            } else if (i === 7 && (j === 2 || j === 5)) {
                piece = {
                    name: 'BISHOP',
                    team: 'WHITE',
                    position: [400, 0, 200, 200],
                    moveHistory: [],
                };
            } else if (i === 0 && j === 3) {
                piece = {
                    name: 'KING',
                    team: 'BLACK',
                    position: [200, 200, 200, 200],
                    moveHistory: [],
                };
            } else if (i === 7 && j === 3) {
                piece = {
                    name: 'KING',
                    team: 'WHITE',
                    position: [200, 0, 200, 200],
                    moveHistory: [],
                };
            } else if (i === 0 && j === 4) {
                piece = {
                    name: 'QUEEN',
                    team: 'BLACK',
                    position: [0, 200, 200, 200],
                    moveHistory: [],
                };
            } else if (i === 7 && j === 4) {
                piece = {
                    name: 'QUEEN',
                    team: 'WHITE',
                    position: [0, 0, 200, 200],
                    moveHistory: [],
                };
            }

            const square = new Square(
                {
                    position: [chessBlockSize * j, chessBlockSize * i, chessBlockSize, chessBlockSize],
                    color,
                },
                piece
            )
            board.push(square);
        }
    }
}

