const { Router } = require('express');
const router = Router();

/** Store games data in res.locals */
router.use((req, res, next) => {
  res.locals.games = require('../data/games.json');
  next();
});

/** Home */
router.get('/', (req, res) => res.render('index'));

/** A game page */
router.get('/:game', (req, res, next) => {
  const games = res.locals.games;
  const game = games.find(({ slug }) => slug === req.params.game.toLowerCase());
  if (!game) return next();

  res.render('game', { game });
});

module.exports = router;
