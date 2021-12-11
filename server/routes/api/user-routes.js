const router = require('express').Router();
const { createUser, getSingleUser, getUsers, login, updateUser, makeFriend, dropFriend } = require('../../controllers/user-controller');

// Import the auth middleware
const { authMiddleware } = require('../../utils/auth');

//  api/users
router.route('/').get(getUsers);  //get all users
router.route('/').post(createUser);  //make new user
router.route('/me').get(authMiddleware, getSingleUser);  //get single user
router.route('/login').post(login); //check password and send back jwt token
router.route('/update').put(updateUser)  //change username, email, password?
router.route('/make-friend').put(makeFriend)  //add to pending friends or move friend from pending to friends
router.route('/drop-friend').put(dropFriend)  //remove person from pending or friends
//delete user and remove from friends lists
module.exports = router;
