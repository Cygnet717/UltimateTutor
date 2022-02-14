export const getUserDecks = async(user_id) => { //variables needed: "user_id"
  const result = await fetch(`/api/decks/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

//variables needed: "deckName", "user_id", "format"
//or: "deckName", "user_id", "versionToBe"++, "format", "deckCards" and "sideBoard" array minus "_id" for each card
export const createDeck = async(deckData) => { 
  const result = await fetch(`/api/decks/create`, {
    method: "POST",
    body: JSON.stringify(deckData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const addCardToDeck = async(cardData) => { //variables needed: "deck_id", "cardName", "image", "cardType", "commander"boolean, "sideBoard"boolean
  const result = await fetch(`/api/decks/addCard`, {
    method: "PUT",
    body: JSON.stringify(cardData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const saveVersion = async(deckData) => {  //variables needed: "deck_id", "versionToBe"
  const result = await fetch(`/api/decks/save`, {
    method: "PUT",
    body: JSON.stringify(deckData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const updateDeck = async(deckData) => { //variables needed: "deck_id", "deckName"  OR "deck_id", "wins", "losses"
  const result = await fetch(`/api/decks/update`, {
    method: "PUT",
    body: JSON.stringify(deckData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const removeCard = async(deckData) => { //variables needed: "deck_id", "card_id", "sideBoard" boolean
  const result = await fetch(`/api/decks/removeCard`, {
    method: "PUT",
    body: JSON.stringify(deckData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const removeDeck = async(deck_id, user_id) => { //variables needed: "deck_id", "user_id"
  const result = await fetch(`/api/decks/removeDeck/${deck_id}/${user_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const toggleCommander = async(cardData) => { //variables needed: "deck_id", "card_id", "commander" boolean
  const result = await fetch(`/api/decks/commander`, {
    method: "PUT",
    body: JSON.stringify(cardData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const sortCardTypes = async(deck) =>{
  //['Creature', 'Instant', 'Sorcery', 'Enchantment', 'Land', 'Planeswalker', 'Artifact']
  let deckCreatures = [];
  let deckInstants = [];
  let deckSorceries = [];
  let deckEnchantments = [];
  let deckLands = [];
  let deckPlaneswalkers = [];
  let deckArtifacts = [];

  for(let i=0; i<deck.deckCards.length; i++){
    switch(deck.deckCards[i].cardType) {
      case "Creature":
        deckCreatures.push(deck.deckCards[i])
        break;
      case 'Instant':
        deckInstants.push(deck.deckCards[i])
        break;
      case 'Sorcery':
        deckSorceries.push(deck.deckCards[i])
        break;
      case 'Enchantment':
        deckEnchantments.push(deck.deckCards[i])
        break; 
      case 'Land':
        deckLands.push(deck.deckCards[i])
        break;
      case 'Planeswalker':
        deckPlaneswalkers.push(deck.deckCards[i])
        break;
      case 'Artifact':
        deckArtifacts.push(deck.deckCards[i])
        break;
      default:
        break;
    }
  }

  let sorted = await [
    {Creatures: deckCreatures}, 
    {Instants: deckInstants}, 
    {Sorceries: deckSorceries},
    {Enchantments: deckEnchantments},
    {Lands: deckLands},
    {Planeswalkers: deckPlaneswalkers},
    {Artifacts: deckArtifacts}
  ]

  return sorted
}