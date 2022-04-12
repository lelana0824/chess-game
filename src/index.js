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

// 오디오 모음
const clickSound = new Audio('../static/click-sound.mp3');

// 체스판 그리기
const boardWithPieces = []
makeChessBoard(boardWithPieces)

canvas.addEventListener('click', onClickCanvas)