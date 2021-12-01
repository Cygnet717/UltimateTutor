const router = require('express').Router();
const { createUser, getSingleUser, getUsers, login } = require('../../controllers/user-controller');

// Import the auth middleware
const { authMiddleware } = require('../../utils/auth');

// Put the authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getUsers);
router.route('/').post(createUser);
router.route('/me').get(authMiddleware, getSingleUser);
router.route('/login').post(login);


module.exports = router;
