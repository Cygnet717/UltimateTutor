const { Deck, User } = require('../models');


module.exports = {
  async getUserDecks(req, res) { //get all decks by user
    const foundDecks = await User.findOne(
      {_id: req.body.user_id}
    )
      .populate('decks');

    res.json(foundDecks);
  },

  async newVersion(req, res) {
    res.json('new version')
  },

  async createDeck(req, res) {  //make new deck
    const newDeck = await Deck.create(req.body)
 
    const userOfDeck = await User.findOneAndUpdate(
      {_id: req.body.user_id},
      {$push: {decks: newDeck._id}},
      {new: true}
      )

    res.json(userOfDeck)
  },

  async updateDeck(req, res) {  //add card to deck/sideboard
    let updatedDeck;
    if(req.body.sideboard){
      updatedDeck = await Deck.findOneAndUpdate(
        {_id: req.body.deck_id},
        {$push: {sideBoard: req}},
        {new: true}
      )
    } else {
      updatedDeck = await Deck.findOneAndUpdate(
        {_id: req.body.deck_id},
        {$push: {deckCards: req}},
        {new: true}
      )
    }
    

    res.json(updatedDeck)
  },

  async saveDeckVersion(req, res) {
    res.json('save deck version')
  }

};