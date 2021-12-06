const router = require('express').Router();
const { getUserDecks, newVersion, createDeck, updateDeck, saveDeckVersion } = require('../../controllers/deck-controller');

//api/decks
// Put the authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getUserDecks);
router.route('/newversion').put(newVersion);
router.route('/create').post(createDeck);
router.route('/update').put(updateDeck);
router.route('/save').put(saveDeckVersion);

module.exports = router;
