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
        const blockPosition = block[0];

        if ((dx < blockPosition[0] + chessBlockSize) && (dy < blockPosition[1] + chessBlockSize)) {
            return block;
        }
    });

    if (clickedBlock[1]) {
        // 말을 선택한 경우
        clickSound.play();

        ctx.strokeStyle = '#bfff00';
        ctx.lineWidth = 10;
        ctx.strokeRect(...(clickedBlock[0].map((position, index) => {
            if (index === 2 || index === 3) {
                return position - 20;
            }
            return position + 10;
        })));

        if (selected) {
            // 이전에 선택한 말이 존재할 경우
            if (selected[1].team === clickedBlock[1].team) {
                // 이전과 지금 선택한 말이 같은 진영일 경우 그냥 리턴
                ctx.strokeStyle = selected[0][selected[0].length - 1];
                ctx.strokeRect(...(selected[0].map((position, index) => {
                    if (index === 2 || index === 3) {
                        return position - 20;
                    }
                    return position + 10;
                })));

                if (selected[1] === clickedBlock[1]) {
                    // 같은 말을 한번 더 클릭한 경우라면 선택 취소하고 리턴
                    selected = null;
                    return;
                }

                selected = clickedBlock;
                return;
            }
            diedPieces.push(clickedBlock[1]);

            clickedBlock[1] = selected[1];
            selected[1] = null;
            selected = null;
            makeChessBoard(boardWithPieces);

            return;
        }
        selected = clickedBlock;
    } else {
        if (!selected && !clickedBlock[1]) {
            return;
        }
        clickSound.play();

        // 말을 선택한 뒤 블록을 선택 경우
        clickedBlock[1] = selected[1];
        selected[1] = null;
        selected = null;
        makeChessBoard(boardWithPieces);
    }
};
