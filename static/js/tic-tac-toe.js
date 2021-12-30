const combinaisons = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

const spans = { player: 'X', bot: 'O' };

//? Game object
const game = {
  /**
   * Scores
   */
  scores: {
    bot: 0,
    player: 0,
  },

  /**
   * Game controllers
   */
  controllers: {
    /**
     * Check win of each turn
     * @returns
     */
    checkTurn: () => {
      const board = document.getElementById('board');
      const ceils = board.querySelectorAll('td');

      //? Check all possible combinaisons
      const turn = game.cache.turn ? spans.player : spans.bot;
      const is_win = combinaisons.some(combinaison => combinaison.every(i => ceils[i].innerHTML === turn));

      //! If turn is a bot/player win
      if (is_win) {
        game.cache.win = true;
        const score = ++game.scores[game.cache.turn ? 'player' : 'bot'];
        document.getElementById(game.cache.turn ? 'player-score' : 'ia-score').innerHTML = score;

        setTimeout(game.play, 1400);

        //! If all ceils is full
      } else if (document.querySelectorAll('td.ceil--disable').length === 9) setTimeout(game.play, 1400);
      else return; //! Continue this game
    },

    /**
     * Player click
     * @param { Event } event
     */
    click: async event => {
      const { target } = event;

      //? Player action
      if (!game.cache.turn || target.classList.contains('ceil--disable') || game.cache.win) return; //! Check if is player turn or if ceil is already used or if end of game
      target.classList.add('ceil--disable');
      target.innerHTML = spans.player;

      //? Check player turn
      game.controllers.checkTurn();
      if (game.cache.win) return;

      //? Bot action
      game.cache.turn = false;
      document.getElementById('statut').innerHTML = 'Le robot joue son tour';
      await game.controllers.auto();
    },

    /**
     * Bot turn
     */
    auto: async () => {
      //? Await 800ms to simulate bot turn
      return new Promise(resolve => {
        setTimeout(async () => {
          const board = document.getElementById('board');

          /**
           * Convert NodeList to Array
           * @type { HTMLTableCellElement[] }
           */
          const ceils_array = [];
          board.querySelectorAll('td').forEach(ceil => ceils_array.push(ceil));
          const empty_ceils_array = ceils_array.filter(ceil => !ceil.classList.contains('ceil--disable'));

          /**
           * Interactives ceils
           * @type { HTMLTableCellElement[] }
           */
          const ceils = combinaisons.reduce((acc, combinaison) => {
            const results = acc;

            const combinaison_ceils = combinaison.map(x => ceils_array[x]);
            const turns = [spans.player, spans.bot];
            for (const turn of turns) {
              const combinaison_ceils_to_turn = combinaison_ceils.filter(ceil => ceil.innerHTML === turn);
              if (combinaison_ceils_to_turn.length < 2) continue;
              const result = combinaison_ceils.find(ceil => !turns.includes(ceil.innerHTML));
              if (result) results.push(result);
            }

            return results;
          }, []);

          const ceil = ceils.length
            ? ceils[Math.floor(Math.random() * ceils.length)]
            : empty_ceils_array[Math.floor(Math.random() * empty_ceils_array.length)];

          ceil.classList.add('ceil--disable');
          ceil.innerHTML = spans.bot;

          //? Check bot turn
          game.controllers.checkTurn();
          if (game.cache.win) return;

          //? Bot action
          game.cache.turn = true;
          document.getElementById('statut').innerHTML = "C'est à vous de jouer";

          resolve(); // End of promesse
        }, 1400);
      });
    },
  },

  /**
   * Start a new game
   */
  play: async () => {
    game.cache = { turn: false };

    const board = document.getElementById('board');
    board.innerHTML = Array.from({ length: 3 }, () => '<tr>' + Array.from({ length: 3 }, () => '<td></td>').join('') + '</tr>').join('');

    game.cache.turn = Math.round(Math.random()) ? true : false;
    document.getElementById('statut').innerHTML = game.cache.turn ? "C'est à vous de jouer" : 'Le robot joue son tour';
    if (!game.cache.turn) await game.controllers.auto();
  },

  /**
   * Init games session
   */
  init: () => {
    const div = document.getElementById('game');
    div.innerHTML =
      '<h1 id="statut">C\'est à vous de jouer</h1><div><div id="scores"><div><h2>Joueur</h2><span id="player-score">0</span></div><div><h2>Robot</h2><span id="ia-score">0</span></div></div><div><table id="board"></table></div></div>';

    const board = document.getElementById('board');
    board.addEventListener('click', game.controllers.click);

    game.play();
  },
};

document.addEventListener('DOMContentLoaded', game.init);
