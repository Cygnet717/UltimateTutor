const router = require('express').Router();
const { getUserDecks, getDeck, createDeck, addToDeck, saveCurrentVersion,  updateDeck , removeCard, removeDeck, toggleCommander} = require('../../controllers/deck-controller');

//api/decks

router.route('/:user_id').get(getUserDecks);  //get decks by user id
router.route('/:deck_id').get(getDeck)
router.route('/create').post(createDeck);  //create all new deck //create new version of deck
router.route('/addCard').put(addToDeck);   //add card to deck or sideboard
router.route('/save').put(saveCurrentVersion);  //save version of deck
router.route('/update').put(updateDeck)  // change deckName, change wins/losses
router.route('/removeCard').put(removeCard) //remove card from deck, 
router.route('/removeDeck/:deck_id/:user_id').delete(removeDeck) //delete deck
router.route('/commander').put(toggleCommander)  //mark card as commander, 
//add comment on deck
module.exports = router;
