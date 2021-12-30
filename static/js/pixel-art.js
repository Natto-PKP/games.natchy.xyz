/**
 * Colors picker
 */
const colors_picker = {
  /**
   * Draw color
   * @returns { string }
   */
  color: () => {
    const random = '#' + Array.from({ length: 6 }, () => ((Math.random() * 16) | 0).toString(16)).join('');
    return `<div class="color" style="background-color: ${random};"></div>`;
  },

  /**
   * Draw colors picker
   */
  board: () => {
    const parent = document.getElementById('colors-picker');
    let result = '';
    for (let i = 0; i < 8 * 12; i++) result += colors_picker.color();
    parent.innerHTML = result;
  },
};

/**
 * Game module
 */
const game = {
  settings: {
    default_color: 'black',
    height: 16,
    width: 16,
  },

  controllers: {
    /**
     * Manage board size
     * @param { Event } event
     */
    size: event => {
      const { target } = event;
      if (['board-heigth', 'board-width'].includes(target.id)) {
        if (target.value > 64) target.value = 64;
        if (8 > target.value) target.value = 8;

        if (target.id === 'board-heigth') game.settings.height = target.value;
        if (target.id === 'board-width') game.settings.width = target.value;

        game.play();
      }
    },

    /**
     * Select a color
     * @param { Event } event
     */
    select: event => {
      const { target } = event;
      if (!target.classList.contains('color')) return;

      const parent = document.getElementById('colors-picker');
      for (const color of parent.children) color.classList.remove('color--selected');
      target.classList.add('color--selected');

      game.cache.actual_color = target.style.backgroundColor;
    },

    /**
     * Draw
     * @param { Event } event
     */
    draw: event => {
      const { target } = event;
      if (target.tagName.toLowerCase() !== 'td') return;

      target.style.backgroundColor = target.style.backgroundColor === game.cache.actual_color ? '' : game.cache.actual_color;
    },

    /**
     *
     * @param { Event } event
     */
    options: event => {
      const { target } = event;

      console.log(target.name);
      if (target.name === 'reset') {
        event.preventDefault();

        game.play();
      } else if (target.name === 'switch') {
        event.preventDefault();

        const board = document.getElementById('board');
        target.innerHTML = board.classList.contains('ceils--black') ? 'Dark' : 'Ligth';
        board.classList.toggle('ceils--black');
      }
    },
  },

  /**
   * Reset cache
   */
  reset: () => {
    game.cache = { recent_colors: Array.from({ length: 5 }, () => 'empty'), favorites_colors: [], actual_color: game.settings.default_color };
  },

  /**
   * Start game
   */
  play: () => {
    /** Reset cache */
    game.reset();

    /** Colors picker */
    colors_picker.board();

    /** Get random color */
    const colors = document.getElementById('colors-picker').children;
    const color = colors[Math.floor(Math.random() * colors.length)];
    game.cache.actual_color = color.style.backgroundColor;
    color.classList.add('color--selected');

    /** Draw board */
    const board = document.getElementById('board');
    board.innerHTML = Array.from(
      { length: game.settings.height },
      () => `<tr>${Array.from({ length: game.settings.width }, () => '<td></td>').join('')}</tr>`
    ).join('');
  },

  /**
   * Init games session
   */
  init: () => {
    const main = document.getElementById('game');
    main.innerHTML = `<div id="form-container">
      <form>
        <fieldset id="board-size">
          <div>
            <label>Taille du tableau</label>
            <input type="number" id="board-heigth" name="height" value="16" min="8" max="64" />/<input type="number" id="board-width" name="width" value="16" min="8" max="64" />
          </div>
        </fieldset>
        <fieldset id="colors-picker-container">
          <legend>Couleurs aléatoires</legend>
          <div id="colors-picker"></div>
        </fieldset>
        <fieldset id="options"> 
          <button name="switch" type="button">Dark</button>
          <button id="reset-button" name="reset" type="button">Reset</button>
        </fieldset>
      </form>
    </div>
    <div id="board-container">
      <table id="board" class="ceils--grid"></table>
    </div>`;

    main.addEventListener('change', game.controllers.size);
    document.getElementById('colors-picker').addEventListener('click', game.controllers.select);
    document.getElementById('board').addEventListener('click', game.controllers.draw);
    document.getElementById('options').addEventListener('click', game.controllers.options);

    game.play();
  },
};

document.addEventListener('DOMContentLoaded', game.init);
