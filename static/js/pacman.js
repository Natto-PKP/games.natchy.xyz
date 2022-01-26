/**
 * Classes
 * ? Order is very important
 */
const classes = [
  'ceil--empty', // 0
  'ceil--gum', // 1
  'ceil--super-gum', // 2
  'ceil--fruit', // 3
  'ceil--block', // 4
  'ceil--fence', // 5
  'ceil--door', // 6
  'ceil--monster', // 7
  'ceil--pacman', // 8
  'ceil--outline', // 9
];

const game = {
  settings: {},

  builds: {
    boards: {
      /**
       * ? 29 / 28
       * Classic board
       */
      classic: () => [
        /*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  */
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        [9, 1, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 9],
        [9, 2, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 2, 9],
        [9, 1, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 9],
        [9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        [9, 1, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 1, 9],
        [9, 1, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 1, 9],
        [9, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 9],
        [9, 9, 9, 9, 9, 9, 1, 4, 4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4, 4, 4, 1, 9, 9, 9, 9, 9, 9],
        [0, 0, 0, 0, 0, 9, 1, 4, 4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4, 4, 4, 1, 9, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 9, 1, 4, 4, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 4, 4, 1, 9, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 9, 1, 4, 4, 0, 5, 5, 5, 6, 6, 5, 5, 5, 0, 4, 4, 1, 9, 0, 0, 0, 0, 0],
        [9, 9, 9, 9, 9, 9, 1, 4, 4, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 4, 4, 1, 9, 9, 9, 9, 9, 9],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 7, 0, 7, 0, 7, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [9, 9, 9, 9, 9, 9, 1, 4, 4, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 4, 4, 1, 9, 9, 9, 9, 9, 9],
        [0, 0, 0, 0, 0, 9, 1, 4, 4, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 4, 4, 1, 9, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 9, 1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 1, 9, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 9, 1, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 1, 9, 0, 0, 0, 0, 0],
        [9, 9, 9, 9, 9, 9, 1, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 1, 9, 9, 9, 9, 9, 9],
        [9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        [9, 1, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 9],
        [9, 1, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 1, 9],
        [9, 2, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 0, 8, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 2, 9],
        [9, 4, 4, 1, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 1, 4, 4, 9],
        [9, 4, 4, 1, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 1, 4, 4, 9],
        [9, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 9],
        [9, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 9],
        [9, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 9],
        [9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
      ],
    },

    section: () => {
      const table = game.builds.table();

      document.getElementById('game').innerHTML = `
        <header>
            <div>
            <button id="game-reset">Rejouer</button>
            <span id="game-score">0</span>
            </div>
        </header>

        <main>
            <table id="board">
                ${table.map(row => `<tr>${row.map(cl => `<td class="${cl}"></td>`).join('')}</tr>`).join('')}
            </table>
        </main>`;

      game.cache.table = document.querySelector('#board').querySelectorAll('tr');
    },

    /**
     * Build HTML/CSS map
     * @returns { string[][] }
     */
    table: () => {
      const board_type = 'classic';
      const array = game.builds.boards[board_type]();
      const table = [];

      for (let y = 0; y < array.length; y++) {
        const row = [];

        for (let x = 0; x < array[y].length; x++) {
          const ceil = array[y][x];
          const base = classes[ceil];
          let ceil_class = base;

          const link_classes = [ceil, 6];
          const border_classes = [4, 5, 9];

          const on_top = y && link_classes.includes(array[y - 1][x]);
          const on_right = array[y][x + 1] && link_classes.includes(array[y][x + 1]);
          const on_bottom = array[y + 1] && link_classes.includes(array[y + 1][x]);
          const on_left = x && link_classes.includes(array[y][x - 1]);

          if (border_classes.includes(ceil)) {
            //! If the ceil is a block or a fence or an outline

            if (on_top && on_left && on_right && on_bottom) {
              //! If the cell is surrounded by cells of the same type
              const on_top_right = y && array[y][x + 1] && array[y - 1][x + 1] === ceil;
              const on_bottom_left = array[y + 1] && x && array[y + 1][x - 1] === ceil;
              const on_bottom_right = array[y + 1] && array[y][x + 1] && array[y + 1][x + 1] === ceil;
              const on_top_left = y && x && array[y - 1][x - 1] === ceil;

              if (!on_top_right) ceil_class += ' ceil--corner ceil--corner--top-right';
              else if (!on_bottom_left) ceil_class += ' ceil--corner ceil--corner--bottom-left';
              else if (!on_bottom_right) ceil_class += ' ceil--corner ceil--corner--bottom-right';
              else if (!on_top_left) ceil_class += ' ceil--corner ceil--corner--top-left';
              else ceil_class = 'ceil--empty';
            } else if (on_top && on_left && on_bottom && !on_right) ceil_class += ' ceil--vertical--left';
            else if (on_top && on_right && on_bottom && !on_left) ceil_class += ' ceil--vertical--right';
            else if (on_top && on_bottom && !on_left && !on_right) ceil_class += ' ceil--vertical';
            else if (on_right && on_bottom && on_left && !on_top) ceil_class += ' ceil--horizontal--bottom';
            else if (on_right && on_top && on_left && !on_bottom) ceil_class += ' ceil--horizontal--top';
            else if (on_right && on_left && !on_top && !on_bottom) ceil_class += ' ceil--horizontal';
            else if (on_top && on_left && !on_right && !on_bottom) ceil_class += ' ceil--corner ceil--corner--top-left';
            else if (on_top && on_right && !on_bottom && !on_left) ceil_class += ' ceil--corner ceil--corner--top-right';
            else if (on_right && on_bottom && !on_left && !on_top) ceil_class += ' ceil--corner ceil--corner--bottom-right';
            else if (on_bottom && on_left && !on_top && !on_right) ceil_class += ' ceil--corner ceil--corner--bottom-left';
            else if (!on_top && !on_right && !on_bottom && !on_left) ceil_class += ' ceil--corner ceil--corner--center';
          } else if (ceil === 6) {
            //! If the cell a door

            if (on_left || on_right) ceil_class += ' ceil--door--horizontal';
            else if (on_top || on_bottom) ceil_class += ' ceil--door--vertical';
          } else if (ceil === 7) {
            //! If the cell if a monster

            const colors = ['red', 'blue', 'pink', 'green', 'purple', 'brown'];

            /**
             * Get a random monster color
             * @param { number } i
             * @returns { { color: string, y: number, x: number, initial_y: number, initial_x: number } | null }
             */
            const getMonster = (i = 0) => {
              const color = colors[i];
              const already_exist = game.cache.monsters.some(monster => monster.color === color);
              return already_exist ? (i >= colors.length ? null : getMonster(++i)) : { color, y, x, initial_y: y, initial_x: x };
            };

            const monster = getMonster();
            if (!monster) continue;

            //? Add monster to cache
            game.cache.monsters.push(monster);
            ceil_class += ` ceil--monster--${monster.color}`;
          }

          row.push(ceil_class);
        }

        table.push(row);
      }

      return table;
    }, // [END] Build HTML/CSS map
  },

  move: {
    /**
     *
     * @param {*} y
     * @param {*} x
     */
    pacman: (y, x) => {
      const pacman_object = game.cache.pacman;
      document.querySelector('.ceil--pacman').classList.remove('ceil--pacman');
    },

    /**
     *
     * @param {*} color
     * @param {*} y
     * @param {*} x
     */
    monster: (color, y, x) => {},
  },

  init: () => {
    //? Cache of game
    game.cache = { monsters: [], pacman: { y: 0, x: 0 }, table: [] };

    //? Build
    game.builds.section();

    //? Place Pacman and Monster
  },
};

document.addEventListener('DOMContentLoaded', game.init);
