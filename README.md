# UltimateTutor

## <span style="color:red">Site in progress</span>

## Wireframe
https://www.figma.com/file/VmG8CukGLlKOtIX3V2z59X/Ultimate-Tutor?node-id=0%3A1

## API
[Skryfall](https://scryfall.com/docs/api)

## MVP

- search for magic cards basic search and advanced search
- make new user
- login/logout
- option to stay logged in indefinitely
- make a new deck (name deck, choose play format)
- add cards to my deck (in deck or side board)
- save version of deck and then track wins/losses
    (add cards, when done save version,no more deck editing, then win/loss tracking available)
    (to make a new version, copy deck data [userid, deckCards, sideBoard, format, commander and versionToBe = version++])
---
- add another user to your friends by username
- approve people requesting to be your friend
- view friends decks
- comment on friends decks\s\s
---
- user settings page
- change username
- change password
- change email



## Models

+ User
  - _id
  - username
  - email
  - password
  - decks [deck id,]
  - pendingFriends [userid, ]
  - friends [userid, ]

+ Decks
  - _id
  - userId
  - toBeVersion //holds next version number until deck is saved
  - version 
  - deckCards [{ name, image, cardType, creatureType},]
  - sideBoard [{ name, image, cardType, creatureType},]
  - wins  //if there is a version number
  - losses  //if there is a version number
  - format
  - commander 
  - comments [{comment, userId},]


## Future Plans

- compare versions of a deck and their win/loss rate
- mark deck as private so friends cant see it
- view all public decks in the database
- Search public decks by commander/ by user
- forgot password functionality

- admin login
- view number of users
- view number of decks