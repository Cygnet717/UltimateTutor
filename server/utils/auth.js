const jwt = require('jsonwebtoken');

/* Set token secret and expiration date */
const secret = "mysecretphrase";
const expiration = '2h';

module.exports = {
  
  /* The function below serves as the authentication middleware for all
  routes that need it. This function looks for an auth token, which can 
  be sent either via a query string in the API url, or as a header in the
  request itself. */

  authMiddleware: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    /* The token is sometimes embedded in some other code we don't need, so we
    are stripping that out here, */
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    /* We use JSON Web Tokens (JWT) to verify the token and get 
    user data out of it */
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    // Go to the next endpoint in the route chain
    next();
  },

  /* This method uses JSON Web Tokens (JWT) to create and sign a new 
  token attached to the user record. Notice how the token is encrypted 
  with the user's username, email, and _id. */
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
