const { Deck, User } = require('../models');


module.exports = {
  //get all decks by user
  async getUserDecks(req, res) { // send "user_id" in body
    try{
      const foundDecks = await User.findOne(
        {_id: req.params.user_id}
      )
        .populate('decks');

      res.json(foundDecks.decks);
    } catch (err){
      res.status(400).json(err)
    }
  },

  //make new deck
      // send "deckName", "user_id", "format"
  //or to make new version
      // send "deckName", "user_id", "versionToBe"++, "format", "deckCards" and "sideBoard" array minus "_id" for each card
  async createDeck(req, res) {  
    try{
      const newDeck = await Deck.create(req.body)
  
      const userOfDeck = await User.findOneAndUpdate(
        {_id: req.body.user_id},
        {$push: {decks: newDeck._id}},
        {new: true}
        )

      res.json(userOfDeck)
    } catch (err){
      res.status(400).json(err)
    }
  },

  //add card to deck/sideBoard
  async addToDeck(req, res) {  // send "deck_id", "cardName", "image", "cardType", "commander"boolean, "sideBoard"boolean
    let updatedDeck;
    try{
      const newCard = {
        cardName: req.body.cardName,
        image: req.body.image,
        cardType: req.body.cardType,
        commander: req.body.commander
      }
      if(req.body.sideBoard){
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
    } catch (err){
      res.status(400).json(err)
    }
  },

  //save current version of deck
  async saveCurrentVersion(req, res) {  // send "deck_id", "versionToBe"
    try{
      const savedVersion = await Deck.findOneAndUpdate(
        {_id: req.body.deck_id},
        {version: req.body.versionToBe},
        {new: true}
      )
      res.json(savedVersion)
    } catch (err){
      res.status(400).json(err)
    }
  },
  
  //update deckName, wins/losses
  async updateDeck(req, res) {  // send "deck_id", "deckName"  OR "deck_id", "wins", "losses"
    let updatedDeck;
    try{
      if(req.body.deckName){
        updatedDeck = await Deck.findOneAndUpdate(
          {_id: req.body.deck_id},
          {deckName: req.body.deckName},
          {new: true}
        )
      } else {
        updatedDeck = await Deck.findOneAndUpdate(
          {_id: req.body.deck_id},
          {wins: req.body.wins, losses: req.body.losses},
          {new: true}
        )
      }
      res.json(updatedDeck)
    } catch (err){
      res.status(400).json(err)
    }

  },

  async toggleCommander(req, res){ // send deck_id, card_id, commander boolean
    try{
      const commandered = await Deck.updateOne(
        {_id: req.body.deck_id, 'deckCards._id': req.body.card_id},
        {$set: {'deckCards.$.commander': req.body.commander}}
      )
      res.json(commandered)
    } catch (err){
      res.status(400).json(err)
    }
  },

  //remove card from deck
  async removeCard (req, res) {  // send "deck_id", "sideBoard"boolean, "card_id"
    let deletedCard;
    try{
      if(req.body.sideBoard){
        deletedCard = await Deck.findOneAndUpdate(
          {_id: req.body.deck_id}, 
          {$pull: {sideBoard: {_id: req.body.card_id}}},
          { new: true }
        )
      } else {
        deletedCard = await Deck.findOneAndUpdate(
          {_id: req.body.deck_id}, 
          {$pull: {deckCards: {_id: req.body.card_id}}},
          { new: true }
        )
      }
      res.json(deletedCard)
    } catch (err){
      res.status(400).json(err)
    }
  },

  //delete deck
  async removeDeck (req, res) {  //send in url parameters for "deck_id" and "user_id"
    try{  //cant send a body in a delete request
      const updatedUser = await User.findOneAndUpdate(
        {_id: req.params.user_id},
        {$pull: {'decks': req.params.deck_id}}
      )
      console.log(updatedUser)
      const deletedDeck = await Deck.remove({_id: req.params.deck_id})
      res.json(deletedDeck)
    } catch (err){
      res.status(400).json(err)
    }
  }
};