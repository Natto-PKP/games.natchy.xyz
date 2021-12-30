/**
 * Author: Nat'
 * Discord: Nat' ❤#1234
 * Rules is based to : https://www.demineur-ligne.com/rules
 */

//? Predefined difficulties
const difficulties = [
  { columns: 7, rows: 8, bombs: 10 }, // Easy
  { columns: 16, rows: 16, bombs: 40 }, // Medium
  { columns: 31, rows: 16, bombs: 99 }, // Hard
];

//? Game module
const game = {
  /**
   * Game table for script
   * ? 0: empty, 1: bomb
   * @type { number[][] }
   */
  table: [],

  /**
   * Game settings
   */
  settings: {
    difficulty: 0,
  },

  controllers: {
    addScore: () => {
      game.settings.score += 1;
      document.getElementById('stats-ceils').innerHTML = game.settings.score;
    },

    /**
     * Function to check in each action if is end of game
     */
    check: () => {
      const board = document.querySelectorAll('tr');
      const win = false;

      board.forEach(row => row.children.forEach(ceil => ceil.classList.contains('ceil--block') && (win = true)));
      if (win) game.controllers.pause();
    },

    /**
     * End of the game
     */
    pause: () => {
      game.settings.pause = true;
    },

    /**
     * Click event
     * @param { Event } event
     */
    click: event => {
      if (game.settings.pause) return; //! If is end of game, return

      const { target } = event;
      if (target.tagName.toLowerCase() !== 'td' || !target.classList.contains('ceil--block')) return; //! If not a ceil or this ceil is already empty

      if (event.altKey) {
        //! If altKey is pressed with clic: manage flag

        target.classList.toggle('ceil--flag');
        target.innerHTML = target.classList.contains('ceil--flag') ? '🚩' : '';
      } else if (event.shiftKey) {
        //! If shiftKey is pressed with clic: manage ?

        target.classList.toggle('ceil--flag');
        target.innerHTML = target.classList.contains('ceil--flag') ? '?' : '';
      } else if (!target.classList.contains('ceil--flag')) {
        //! If target not contains flag

        const board = document.querySelectorAll('tr'); // Get rows of table
        const rows_length = game.settings.rows;
        const columns_length = game.settings.columns;

        const initial_y = target.parentElement.rowIndex;
        const initial_x = target.cellIndex;
        const ceil = game.table[initial_y][initial_x]; // Get ceil to game.table

        if (ceil === 1) {
          //! If ceil is bomb

          for (let y = 0; y < rows_length; y++) {
            for (let x = 0; x < columns_length; x++) {
              const current_ceil = game.table[y][x];
              if (current_ceil !== 1) continue;

              const current_td = board[y].children[x];
              current_td.classList.remove('ceil--block');
              current_td.classList.add('ceil--bomb');
              current_td.innerHTML = '💣';
            }
          }

          game.controllers.pause();
        } else if (typeof ceil === 'string') {
          //! If ceil is a indice

          //? Show indice
          target.classList.remove('ceil--block');
          target.innerHTML = ceil;

          game.controllers.addScore();
          game.controllers.check();
        } else {
          //! If ceil is empty

          const display = (y, x) => {
            for (let current_y = y - 1 < 0 ? 0 : y - 1; current_y <= (y + 1 < rows_length - 1 ? y + 1 : rows_length - 1); current_y++) {
              for (let current_x = x - 1 < 0 ? 0 : x - 1; current_x <= (x + 1 < columns_length - 1 ? x + 1 : columns_length - 1); current_x++) {
                const current_td = board[current_y].children[current_x]; // Get ceil to HTML table
                if (!current_td.classList.contains('ceil--block')) continue; //! Continue if current HTML ceil is already display

                const current_ceil = game.table[current_y][current_x]; // Get ceil to game.table

                if (current_ceil === 0) {
                  //! If is empty

                  current_td.classList.remove('ceil--block');
                  display(current_y, current_x); // Recursive

                  game.controllers.addScore();
                } else if (typeof current_ceil === 'string') {
                  //! If is indice

                  current_td.classList.remove('ceil--block');
                  current_td.innerHTML = current_ceil;

                  game.controllers.addScore();
                }
              } // [END] columns loop
            } // [END] rows loop
          }; // [END] display function

          display(initial_y, initial_x);
          game.controllers.check();
        }
      }
    }, // [END] click

    /**
     * Restart with other/same difficulty
     * @param { 0 | 1 | 2 } difficulty
     */
    restart: difficulty => {
      game.settings.difficulty = difficulty;
      game.init();
    },
  },

  /**
   * Init a new game
   */
  init: () => {
    //? Define settings
    game.settings = { ...game.settings, ...difficulties.find((_, i) => i === game.settings.difficulty), score: 0, pause: 0 };

    //? Build html
    const parent = document.getElementById('game');
    parent.innerHTML = `<div id="game-board">
        <div id="stats">
            <div>
                <span id="stats-ceils">0</span>
                <span>découvertes</span>
            </div>
            <div>
                <span id="stats-bombs">${game.settings.bombs}</span>
                <span>💣</span>
            </div>
        </div>

        <table id="board">
            ${Array.from(
              { length: game.settings.rows },
              () => `<tr>${Array.from({ length: game.settings.columns }, () => '<td class="ceil--block"></td>').join('')}</tr>`
            ).join('')}
        </table>

        <aside>ALT + clic pour mettre un drapeau</aside>
        <aside>MAJ + clic pour mettre un ?</aside>

        <ul>
            <li><button onClick="game.controllers.restart(0)">Débutant</button></li>
            <li><button onClick="game.controllers.restart(1)">Intermédiaire</button></li>
            <li><button onClick="game.controllers.restart(2)">Expert</button></li>
        </ul>
    </div>`;

    //? Build ceils
    game.table = Array.from({ length: game.settings.rows }, () => Array.from({ length: game.settings.columns }, () => 0));

    //? Add random bombs in ceils
    const addbomb = () => {
      const bomb_y = Math.floor(Math.random() * game.settings.rows);
      const bomb_x = Math.floor(Math.random() * game.settings.columns);
      if (game.table[bomb_y][bomb_x] !== 1) game.table[bomb_y][bomb_x] = 1;
      else addbomb();
    };

    for (let i = 0; i < game.settings.bombs; i++) addbomb(); // Add x bomb

    //? Bombs indice
    for (let y = 0; y < game.settings.rows; y++) {
      if (!game.table[y].includes(1)) continue; //! If row not contains a bomb
      for (let x = 0; x < game.settings.columns; x++) {
        const ceil = game.table[y][x];
        if (ceil !== 1) continue; //! If ceil is bomb

        //? Look at the ceils around the bomb
        for (let bomb_y = y - 1 < 0 ? 0 : y - 1; bomb_y <= (y + 1 < game.settings.rows - 1 ? y + 1 : game.settings.rows - 1); bomb_y++) {
          for (let bomb_x = x - 1 < 0 ? 0 : x - 1; bomb_x <= (x + 1 < game.settings.columns - 1 ? x + 1 : game.settings.columns - 1); bomb_x++) {
            const bomb_ceil = game.table[bomb_y][bomb_x];
            if (bomb_ceil === 1) continue; //! Skip if is bomb
            game.table[bomb_y][bomb_x] = typeof bomb_ceil === 'string' ? (Number(bomb_ceil) + 1).toString() : '1'; // Increment
          }
        }
      }
    }

    //? Listen click event
    const board = document.getElementById('board');
    board.addEventListener('click', game.controllers.click);
  },
};

document.addEventListener('DOMContentLoaded', game.init);
