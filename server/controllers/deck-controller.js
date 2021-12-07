const { Deck, User } = require('../models');


module.exports = {
  //get all decks by user
  async getUserDecks(req, res) { // send "user_id" in body
    const foundDecks = await User.findOne(
      {_id: req.body.user_id}
    )
      .populate('decks');

    res.json(foundDecks.decks);
  },

  //make new deck
      // send "deckName", "user_id", "format"
  //or to make new version
      // send "deckName", "user_id", "versionToBe"++, "format", "deckCards" and "sideboard" array minus "_id" for each card
  async createDeck(req, res) {  
    const newDeck = await Deck.create(req.body)
 
    const userOfDeck = await User.findOneAndUpdate(
      {_id: req.body.user_id},
      {$push: {decks: newDeck._id}},
      {new: true}
      )

    res.json(userOfDeck)
  },

  //add card to deck/sideboard
  async addToDeck(req, res) {  // send "deck_id", "cardName", "image", "cardType", "commander"boolean, "sideboard"boolean
    let updatedDeck;
    const newCard = {
      cardName: req.body.cardName,
      image: req.body.image,
      cardType: req.body.cardType,
      commander: req.body.commander
    }
    if(req.body.sideboard){
      updatedDeck = await Deck.findOneAndUpdate(
        {_id: req.body.deck_id},
        {$push: {sideBoard: newCard}},
        {new: true}
      )
    } else {
      updatedDeck = await Deck.findOneAndUpdate(
        {_id: req.body.deck_id},
        {$push: {deckCards: newCard}},
        {new: true}
      )
    }
    
    res.json(updatedDeck)
  },

  //save current version of deck
  async saveCurrentVersion(req, res) {  // send "deck_id", "versionToBe"
    const savedVersion = await Deck.findOneAndUpdate(
      {_id: req.body.deck_id},
      {version: req.body.versionToBe},
      {new: true}
    )
    res.json(savedVersion)
  },
  

};