const { Deck, User } = require('../models');


module.exports = {
  async getUserDecks(req, res) {
    const foundDecks = await User.findOne({});

    

    res.json(foundDecks);
  },

  async newVersion(req, res) {
    res.json('new version')
  },

  async createDeck(req, res) {
    const newDeck = await Deck.create(req.body)
 
    const userOfDeck = await User.findOneAndUpdate(
      {_id: req.body.user_id},
      {$push: {decks: newDeck._id}},
      {new: true}
      )

    res.json(userOfDeck)
  },

  async updateDeck(req, res) {
    res.json('update deck')
  },

  async saveDeckVersion(req, res) {
    res.json('save deck version')
  }

};