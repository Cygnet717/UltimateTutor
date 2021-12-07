const router = require('express').Router();
const { createUser, getSingleUser, getUsers, login } = require('../../controllers/user-controller');

// Import the auth middleware
const { authMiddleware } = require('../../utils/auth');

//  api/users
router.route('/').get(getUsers);  //get all users
router.route('/').post(createUser);  //make new user
router.route('/me').get(authMiddleware, getSingleUser);  //get single user
router.route('/login').post(login); //check password and send back jwt token
//change username, email, password?
//add to pending friends or move friend from pending to friends
//remove person from pending or friends

module.exports = router;
