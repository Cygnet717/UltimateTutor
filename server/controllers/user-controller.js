const { User } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
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

  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

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
  },

  async updateUser(req, res){  //send username, email
    try{
      const updatedUser = await User.update(req.body, {where: {_id: req.body.user_id}})

      res.json(updatedUser)
    }catch (err){
      res.status(400).json(err)
    }
  },

  async makefriend(req, res){  //send loggedin user_id, friend_id
    try{
      const checkFriend = await User.find()
      //user1 sends friend_id
      //if user1.pendingfriends contains friend_id move to friend array add user_id to friend_id friends array
      //if user1.pendingfriends doesnt contain friend_id add user1 to friends pending array
    }catch (err){
      res.status(400).json(err)
    }
  },
  
  async dropFriend(req, res){  //send loggedin user_id, friend_id
    try{
      //remove user_id from friend_id friend list or pending list
      //remove friend_id from user_id friend list or pending list
    }catch (err){
      res.status(400).json(err)
    }
  }
};
