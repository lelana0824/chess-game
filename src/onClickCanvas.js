const diedPieces = [];
let selected = null;

const onClickCanvas = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const mouseX = parseInt(e.clientX - offsetX);
    const mouseY = parseInt(e.clientY - offsetY);

    const dx = mouseX * dpr;
    const dy = mouseY * dpr;

    const clickedBlock = boardWithPieces.find((block) => {
        const blockPosition = block.square.position;

        if ((dx < blockPosition[0] + chessBlockSize) && (dy < blockPosition[1] + chessBlockSize)) {
            return block;
        }
    });

    if (clickedBlock.piece) {
        // 말을 선택한 경우
        clickSound.play();
        drawSelectedLine(clickedBlock);

        const movableSquares = checkMovablePosition(clickedBlock, boardWithPieces);

        // 행마가 가능한 모든곳의 square 색을 변경한다.
        ctx.fillStyle = "rgba(128,255,255,0.5)"
        
        const anotherSquares = movableSquares.filter((block) => {
            const blockPosition = block;
    
            if (clickedBlock !== blockPosition) return true;
            return false;
        });

        anotherSquares.forEach(square => {
            ctx.fillRect(...square.square.position);
        })

        if (selected) {
            // 이전에 선택한 말이 존재할 경우

            // 이전과 지금 선택한 말이 같은 진영일 경우
            if (selected.piece.team === clickedBlock.piece.team) {
                ctx.strokeStyle = selected.square.color;
                ctx.strokeRect(...(selected.square.position.map((position, index) => {
                    if (index === 2 || index === 3) {
                        return position - 20;
                    }
                    return position + 10;
                })));

                if (selected.piece === clickedBlock.piece) {
                    // 같은 말을 한번 더 클릭한 경우라면 선택 취소
                    selected = null;
                    drawChessBoard(boardWithPieces);
                    return;
                }

                selected = clickedBlock;
                drawChessBoard(boardWithPieces);
                drawSelectedLine(selected)
                return;
            }
            // 먹을수 없는 말을 선택한 경우
            const movableSquares = checkMovablePosition(selected, boardWithPieces);
            if (!movableSquares.some(square => square === clickedBlock)) {
                alert("이동할 수 없는 칸입니다.")
                return;
            }

            diedPieces.push(clickedBlock.piece);

            clickedBlock.piece = selected.piece;
            selected.piece = null;
            selected = null;
            drawChessBoard(boardWithPieces);

            return;
        }
        selected = clickedBlock;
    } else {
        if (!selected && !clickedBlock.piece) {
            return;
        }
        clickSound.play();

        // 말을 선택한 뒤 블록을 선택 경우
        const movableSquares = checkMovablePosition(selected, boardWithPieces);
        console.log(movableSquares)

        // 이동할 수 없는 블록을 선택한 경우
        if (!movableSquares.some(square => square === clickedBlock)) {
            alert("이동할 수 없는 칸입니다.")
            return;
        }
        // 비어있는 칸일 경우
        selected.piece.moveHistory.push(selected.square.position);
        clickedBlock.piece = selected.piece;
        selected.piece = null;
        selected = null;
        drawChessBoard(boardWithPieces);
    }
};

function drawSelectedLine(clickedBlock) {
    ctx.strokeStyle = '#bfff00';
    ctx.lineWidth = 10;
    ctx.strokeRect(...(clickedBlock.square.position.map((position, index) => {
        if (index === 2 || index === 3) {
            return position - 20;
        }
        return position + 10;
    })));
}

function checkMovablePosition(clickedPiece, board) {
    if (!clickedPiece.piece) return;

    let newBoard = board;
    const selectedIndex = newBoard.findIndex(square => square === clickedPiece)

    if (clickedPiece.piece.name === 'PAWN') {
        const movableIndex = clickedPiece.piece.team === 'WHITE' ? -8 : 8
        const pawnMovable대각선Index = clickedPiece.piece.team === 'WHITE' ? -7 : 7
        const pawnMovable대각선Index2 = clickedPiece.piece.team === 'WHITE' ? -9 : 9

        if (!clickedPiece.piece.moveHistory.length) {
            newBoard = newBoard.filter((square, index) => {
                if (index === selectedIndex + movableIndex || index === selectedIndex + movableIndex * 2) {
                    if (!square.piece) {
                        return square
                    }
                }
                if (clickedPiece.piece?.team !== square.piece?.team && (index === selectedIndex + pawnMovable대각선Index || index === selectedIndex + pawnMovable대각선Index2)) {
                    if (square.piece) {
                        return square
                    }
                }
            })
        } else {
            newBoard = newBoard.filter((square, index) => {
                if (index === selectedIndex + movableIndex) {
                    if (!square.piece) {
                        return square
                    }
                }
                if (clickedPiece.piece?.team !== square.piece?.team && (index === selectedIndex + pawnMovable대각선Index || index === selectedIndex + pawnMovable대각선Index2)) {
                    if (square.piece) {
                        return square
                    }
                }
            })
        }
    }

    // 만약 해당 기물이 킹이고, 이동할 수 있는 공간이 없으면 체크 메이트로, 게임은 끝나게 된다.
    return newBoard
}