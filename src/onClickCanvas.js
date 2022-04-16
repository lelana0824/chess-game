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

        ctx.strokeStyle = '#bfff00';
        ctx.lineWidth = 10;
        ctx.strokeRect(...(clickedBlock.square.position.map((position, index) => {
            if (index === 2 || index === 3) {
                return position - 20;
            }
            return position + 10;
        })));

        if (selected) {
            // 이전에 선택한 말이 존재할 경우
            if (selected.piece.team === clickedBlock.piece.team) {
                // 이전과 지금 선택한 말이 같은 진영일 경우 그냥 리턴
                ctx.strokeStyle = selected.square.color;
                ctx.strokeRect(...(selected.square.position.map((position, index) => {
                    if (index === 2 || index === 3) {
                        return position - 20;
                    }
                    return position + 10;
                })));

                if (selected.piece === clickedBlock.piece) {
                    // 같은 말을 한번 더 클릭한 경우라면 선택 취소하고 리턴
                    selected = null;
                    drawChessBoard(boardWithPieces);
                    return;
                }

                selected = clickedBlock;
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
        clickedBlock.piece = selected.piece;
        selected.piece = null;
        selected = null;
        drawChessBoard(boardWithPieces);
    }
};
