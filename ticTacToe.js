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
        if (this.gameOver || this.board[position] !== '')
            return false;

        const currentSymbol = this.simbols.options[this.simbols.turnIndex];
        this.board[position] = currentSymbol;
        this.draw();

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        if (this.is_game_over()) {
            this.game_is_over();

            if (winning_sequences_index >= 0) {
                this.game_is_over();
                this.stylize_winner_sequence(this.winningSequences[winning_sequences_index]);
            } else {
                this.symbols.change();
            }
            return true;
        }
        else {
            return false;
        }
    },
    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
            this
                .container_element
                .querySelector(`div:nth-child(${position + 1})`)
                .classList.add('winner');
        });
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

    },
    is_game_over() {
        return !this.board.includes('');
    },

    start: function () {
        this.board.fill('');
        this.draw();
        this.gameOver = false;
    },

    restart() {
        if (this.is_game_over() || this.gameover) {
            this.start();
            console.log('this game has been restarted!')
        } else if (confirm('Are you sure you want to restart this game?')) {
            this.start();
            console.log('this game has been restarted!')
        }
    },

    draw() {
        this.container_element.innerHTML = this.board.map((element, index) =>
            `<div onclick="tic_tac_toe.make_play('${index}')"> 
         ${element} </div>`).reduce((content, current) => content + current);
    },

};
