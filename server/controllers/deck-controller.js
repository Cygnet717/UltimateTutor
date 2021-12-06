const { Deck } = require('../models');


module.exports = {
  async getUserDecks(req, res) {
    const foundDecks = await User.findOne({});

    

    res.json(foundDecks);
  },

  async newVersion(req, res) {
    res.json('new version')
  },

  async createDeck(req, res) {
    res.json({message: 'new deck'})
  },

  async updateDeck(req, res) {
    res.json('update deck')
  },

  async saveDeckVersion(req, res) {
    res.json('save deck version')
  }

};