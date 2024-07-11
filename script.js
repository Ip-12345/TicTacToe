const board = document.querySelector('.board');
let currentplayer = 'X';
let winner = null;
const cells = Array.from({ length: 9 }).fill(null);

function checkwinner() {
    const winningconditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let x of winningconditions) {
        const [a, b, c] = x;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c])
            return cells[a];
    }

    return null;
}

function handlecellclick(index) {
    if (winner || cells[index]) return;

    cells[index] = currentplayer;
    render();

    winner = checkwinner();

    if (winner) {
        setTimeout(() => {
            alert(`Player ${winner} wins!`);
            resetgame();
        }, 100); //0.1sec
    }
    else if (!cells.includes(null)) { //no more cells have null i.e. all cells are filled, also no one won, implying tie
        setTimeout(() => {
            alert(`It's a tie!`);
            resetgame();
        }, 100);
    }
    else {
        currentplayer = currentplayer === 'X' ? 'O' : 'X';
    }
}

function render() {
    board.innerHTML = '';
    cells.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value || '';
        cell.addEventListener('click', () => handlecellclick(index));
        board.appendChild(cell);
    });
}

function resetgame() {
    cells.fill(null);
    currentplayer = 'X';
    winner = null;
    render();
}

render();