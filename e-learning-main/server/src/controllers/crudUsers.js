const User = require("../models/userModule");

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
// Get all users
// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users); // Change 'courses' to 'users'
  } catch (error) {
    res.status(500).send({ error });
  }
};

// get User for SideBare

exports.getUserForSideBare = async (req, res, next) => {
  try {
    const loggedInUser = req.params.id;
    const filterUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(200).send(filterUsers);
  } catch (error) {
    res.status(500).send({ error });
  }
};

// Get user by id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
// get user by FirstName
exports.getUserByFirstName = async (req, res, next) => {
  try {
    const user = await User.findOne({ firstName: req.params.firstName });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Update user by id
exports.updateUserById = async (req, res, next) => {
  try {
    // get the id from the parameter
    const id = req.params.id;
    // get the data from the request body
    const data = req.body;
    // update the user
    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    next(err);
  }
};
//update my data
exports.updateMyData = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true, // Return the updated document
    });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateUsers = async (req, res, next) => {
  try {
    const { id, firstName, lastName, email, password, telephone, address } =
      req.body;

    // Hash new password if provided
    let hashedPassword = null;
    if (password) {
      const bcrypt = require("bcrypt");
      hashedPassword = await bcrypt.hash(password, 12);
    }

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.telephone = telephone; // Update telephone
    user.address = address; // Update address
    if (hashedPassword) {
      user.password = hashedPassword; // Update password if provided
    }
    await user.save();

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone, // Include telephone in response
        address: user.address, // Include address in response
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//

// Delete user by id
exports.deleteUserById = async (req, res, next) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // delete the user
    const user = await User.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
