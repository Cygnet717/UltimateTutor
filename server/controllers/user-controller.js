// import user model
const { User } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  /* Returns a single user by either their id or their username.
  Notice the $or statement below. This is how you can do a Mongoose 
  query with an "or" instead of "and" clause. The query below will attempt
  first to match by _id if a value is passed through; otherwise it will try
  to match on username. */

  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },


  async getUsers(req, res) {
    console.log("finding users")
    const foundUsers = await User.find({});
    console.log(foundUsers)
    res.json(foundUsers);
  },


  /* Here we are creating a new user. When doing so, we also created a signed token to be 
  "attached" to that user. The result is sent back to (in this case) client/src/components/SignUpForm.js */

  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },


  /* Here we are handling a login attempt. First we validate the _id or username value. 
  Then we validate the password using a hook built into the User model. If all is valid, 
  we return a signed token and the user info back to the client. */

  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  }
};
