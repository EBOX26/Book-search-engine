// Import the User model
const { User } = require('../models');
// Import the signToken function from the auth utility
const { signToken } = require('../utils/auth');

module.exports = {
  // Retrieve a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    try {
      // Find a user based on either id or username
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });

      // If no user is found, return an error response
      if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id or username!' });
      }

      // Return the found user
      res.json(foundUser);
    } catch (err) {
      // Handle errors
      console.error(err);
      res.status(500).json({ message: 'Internal server error while fetching user' });
    }
  },

  // Create a new user, sign a token, and send it back
  // (used in client/src/components/SignUpForm.js)
  async createUser({ body }, res) {
    try {
      // Create a user
      const user = await User.create(body);

      // If user creation fails, return an error response
      if (!user) {
        return res.status(400).json({ message: 'Failed to create user' });
      }

      // Sign a token and send it back along with the user data
      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      // Handle errors
      console.error(err);
      res.status(500).json({ message: 'Internal server error during user creation' });
    }
  },

  // Log in a user, sign a token, and send it back
  // (used in client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    try {
      // Find a user based on either username or email
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

      // If no user is found, return an error response
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      // Check if the password is correct
      const correctPw = await user.isCorrectPassword(body.password);

      // If the password is incorrect, return an error response
      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }

      // Sign a token and send it back along with the user data
      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      // Handle errors
      console.error(err);
      res.status(500).json({ message: 'Internal server error during login' });
    }
  },

  // Save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // User comes from `req.user` created in the auth middleware function
  async saveBook({ user, body }, res) {
    try {
      // Update the user by adding the book to the `savedBooks` set
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );

      // Return the updated user
      return res.json(updatedUser);
    } catch (err) {
      // Handle errors
      console.error(err);
      res.status(400).json(err);
    }
  },

  // Remove a book from `savedBooks`
  async deleteBook({ user, params }, res) {
    try {
      // Update the user by pulling the specified bookId from the `savedBooks` array
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );

      // If no updated user is found, return an error response
      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
      }

      // Return the updated user
      return res.json(updatedUser);
    } catch (err) {
      // Handle errors
      console.error(err);
      res.status(500).json({ message: 'Internal server error during book deletion' });
    }
  },
};
