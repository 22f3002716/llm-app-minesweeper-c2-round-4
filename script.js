const BOARD_SIZE = 8;
const NUM_MINES = 10;
const gameBoardElement = document.getElementById('game-board');
let board = []; // 2D array to store game state

// Function to initialize the board
function initializeBoard() {
    // Create empty board
    board = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0));

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        const row = Math.floor(Math.random() * BOARD_SIZE);
        const col = Math.floor(Math.random() * BOARD_SIZE);

        if (board[row][col] !== 'mine') {
            board[row][col] = 'mine';
            minesPlaced++;
        }
    }

    // Calculate neighbor counts
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] !== 'mine') {
                board[r][c] = window.countNeighbors(r, c); // Use window.countNeighbors for verification
            }
        }
    }

    renderBoard();
}

// Function to count neighbors (exposed globally for verification)
window.countNeighbors = function(row, col) {
    let count = 0;
    for (let rOffset = -1; rOffset <= 1; rOffset++) {
        for (let cOffset = -1; cOffset <= 1; cOffset++) {
            // Skip the current cell itself
            if (rOffset === 0 && cOffset === 0) continue;

            const nRow = row + rOffset;
            const nCol = col + cOffset;

            // Check boundaries
            if (nRow >= 0 && nRow < BOARD_SIZE && nCol >= 0 && nCol < BOARD_SIZE) {
                if (board[nRow][nCol] === 'mine') {
                    count++;
                }
            }
        }
    }
    return count;
};

// Function to render the board in HTML
function renderBoard() {
    gameBoardElement.innerHTML = ''; // Clear previous board
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell', 'hidden');
            cellElement.dataset.row = r;
            cellElement.dataset.col = c;
            cellElement.addEventListener('click', handleCellClick);
            gameBoardElement.appendChild(cellElement);
        }
    }
}

// Function to handle cell clicks
function handleCellClick(event) {
    const cellElement = event.target;
    if (!cellElement.classList.contains('hidden')) {
        return; // Already revealed
    }

    const row = parseInt(cellElement.dataset.row);
    const col = parseInt(cellElement.dataset.col);
    const cellValue = board[row][col];

    cellElement.classList.remove('hidden');
    cellElement.classList.add('revealed');

    if (cellValue === 'mine') {
        cellElement.classList.add('mine');
        cellElement.textContent = '💣'; // Bomb emoji
        alert('Game Over! You hit a mine!');
        // Disable further clicks on all cells
        gameBoardElement.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
    } else {
        if (cellValue > 0) {
            cellElement.textContent = cellValue;
            cellElement.classList.add(`count-${cellValue}`);
        }
        // If cellValue is 0, it remains empty
    }
}

// Initial board setup
initializeBoard();
