const router = require('express').Router();
const { getUserDecks, newVersion, createDeck, updateDeck, saveDeckVersion } = require('../../controllers/deck-controller');

//api/decks

router.route('/').get(getUserDecks);  //get decks by user id
router.route('/newversion').put(newVersion);  //create new version of deck
router.route('/create').post(createDeck);  //create all new deck
router.route('/update').put(updateDeck);   //add card to deck or sideboard
router.route('/save').put(saveDeckVersion);  //save version of deck
// change deckName, change wins/losses
//remove card from deck, 
//mark card as commander, 
//add comment on deck
module.exports = router;
