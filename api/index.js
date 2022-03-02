const router = require('express').Router();
const userRoutes = require('./user-routes');
const deckRoutes = require('./deck-routes');

router.use('/users', userRoutes);
router.use('/decks', deckRoutes);

module.exports = router;
