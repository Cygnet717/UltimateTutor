const router = require('express').Router();
const { getUserDecks, createDeck, addToDeck, saveCurrentVersion } = require('../../controllers/deck-controller');

//api/decks

router.route('/').get(getUserDecks);  //get decks by user id
router.route('/create').post(createDeck);  //create all new deck //create new version of deck
router.route('/addCard').put(addToDeck);   //add card to deck or sideboard
router.route('/save').put(saveCurrentVersion);  //save version of deck
// change deckName, change wins/losses
//remove card from deck, 
//mark card as commander, 
//add comment on deck
module.exports = router;
