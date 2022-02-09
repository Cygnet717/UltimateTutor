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
    const foundUsers = await User.find({});
    res.json(foundUsers);
  },

  async getUserFriends(req, res) {
    const foundFriends = await User.findOne({
      _id: req.params.user_id
    })
    .populate('pendingFriends')
    .populate('friends')

    res.json(foundFriends);
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

  async makeFriend(req, res){  //send loggedin user_id, friend_id, inPending boolean (true = friend_id is in pending list already and should be moved to friend list)
    try{
      let updatedFriends;
      if(req.body.inPending){
        //remove from pendingFriends
        const removedPending = await User.findOneAndUpdate(
          {_id: req.body.user_id}, 
          {$pull: {pendingFriends: req.body.friend_id}}
        )

        //add to friend_id friends list
        updatedFriends = await User.findOneAndUpdate(
          {_id: req.body.user_id}, 
          {$addToSet: {friends: req.body.friend_id}},
          { new: true }
        )

        //add to user_id friends list
        const addedToFriend = await User.findOneAndUpdate(
          {_id: req.body.friend_id},
          {$addToSet: {friends: req.body.user_id}}
        )

      } else {
        //add user_id to friends pending list
        updatedFriends = await User.findOneAndUpdate(
          {_id: req.body.friend_id}, 
          {$addToSet: {pendingFriends: req.body.user_id}},
          { new: true }
        )
      }
      res.json(updatedFriends)
    }catch (err){
      res.status(400).json(err)
    }
  },
  
  async dropFriend(req, res){  //send loggedin user_id, friend_id
    try{
      //remove friend_id from user_id friend list or pending list
      const removedFriend = await User.findOneAndUpdate(
        {_id: req.body.user_id},
        {$pull: {friends: req.body.friend_id, pendingFriends: req.body.friend_id}},
        {new: true}
      )
      //remove user_id from friend_id friend list or pending list
      const removedUser = await User.findOneAndUpdate(
        {_id: req.body.friend_id},
        {$pull: {friends: req.body.friend_id, pendingFriends: req.body.friend_id}}
      )

      res.json(removedFriend)
    }catch (err){
      res.status(400).json(err)
    }
  }
};
