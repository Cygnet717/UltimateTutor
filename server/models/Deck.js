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
    deckCards: [{
      cardName: String,
      image: String,
      cardType: String,
      creatureType: String,
      commander: Boolean
    }],
    sideBoard: [{
      cardName: String,
      image: String,
      cardType: String,
      creatureType: String
    }],
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number
    },
    format: {
      type: String
    },
    comments: [{
      user_id: Schema.Types.ObjectId,
      comment: String
    }],
    dateStarted: { type: Date }
  }
);

const Deck = model('Deck', deckschema);
module.exports = Deck;