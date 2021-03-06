const { Schema, model } = require('mongoose');

const deckschema = new Schema(
  {
    deckName: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      reuqired: true
    },
    versionToBe: {
      type: Number,
      default: 1,
    },
    version: {
      type: Number
    },
    commander: {
      cardName: String,
      image: {
        front: String,
        back: String
      },
      cardType: String,
      _id: Schema.Types.ObjectId
    },
    deckCards: [{
      cardName: String,
      image: {
        front: String,
        back: String
      },
      cardType: String
    }],
    sideBoard: [{
      cardName: String,
      image:  {
        front: String,
        back: String
      },
      cardType: String
    }],
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    },
    format: {
      type: String
    },
    comments: [{
      user_id: Schema.Types.ObjectId,
      comment: String
    }],
    dateStarted: { 
      type: Date,
      default: new Date()  
    }
  }
);

const Deck = model('Deck', deckschema);
module.exports = Deck;
