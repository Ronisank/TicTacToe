// Jogo Da Velha

const ticTacToe = {
    board: ['', '', '', '', '', '', '', '', ''],
    simbols: {
        options: ['O', 'X'],
        turnIndex: 0,
        change: function () {
            this.turnIndex = (this.turnIndex === 0 ? 1 : 0);
        }
    },
    containerElement: null,
    gameOver: false,
    winningSequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    init: function (container) {
        this.containerElement = container;
    },
    makePlay: function (position) {
        if (this.gameOver)
            return false;
        if (this.board[position] === '') {
            this.board[position] = this.simbols.options[this.simbols.turnIndex];
            this.draw();
            let winningSequencesIndex = this.checkWinningSequences(
                this.simbols.options[this.simbols.turnIndex]);
            if (winningSequencesIndex >= 0) {
                this.gameOver();
            } else {
                this.simbols.change();
            }
            return true;
        }
        else {
            return false;
        }
    },
    checkWinningSequences: function (simbol) {
        for (i in this.winningSequences) {
            if (this.board[this.winningSequences[i][0]] == simbol &&
                this.board[this.winningSequences[i][1]] == simbol &&
                this.board[this.winningSequences[i][2]] == simbol) {
                console.log('winning sequences INDEX: ' + 1);
                return i;
                   
            }
        };
        return -1;
    },
    gameIsOver: function () {
        this.gameOver = true;
        console.log('GAME OVER');
        alert("Game Over")
    },
    start: function () {
        this.board.fill('');
        this.draw();
        this.gameOver = false;
    },
    draw: function () {
        let content = '';

        for (i in this.board) {
            content += '<div onclick="ticTacToe.makePlay(' + i + ')">'
                + this.board[i] + '</div>';
        };
        this.containerElement.innerHTML = content;
    },
};
