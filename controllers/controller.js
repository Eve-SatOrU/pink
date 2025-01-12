const User = require('../models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { Op } = require('sequelize');
const multer = require('multer');
const axios = require('axios');
const path = require('path');




User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt();
  user.userPassword = await bcrypt.hash(user.userPassword, salt);
});


function validateStrongPassword(password) {
  if (password.length < 8) {
    return false;
  }
  const letterRegex = /[a-zA-Z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*]/;
  if (!letterRegex.test(password) || !numberRegex.test(password) || !specialCharRegex.test(password)) {
    return false;
  }
  return true;
}


exports.postRegister = async (req, res, next) => {
  const { userName, userPassword, email } = req.body;

  if (!validateStrongPassword(userPassword)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long and must contain a combination of letters, numbers, and special characters."
    });
  }
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        { userName },
        { email }
      ]
    }
  });
  if (existingUser) {
    return res.status(400).json({ error: 'Username or email is already taken.' });
  }

  try {
    const user = await User.create({
      userName,
      userPassword,
      email
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.postLogin = async (req, res) => {
  const { userName, userPassword } = req.body;
  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    req.session.user = user;
    req.session.userId = user.id;
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('sid');
    return res.status(200).json({ message: 'Logout successful' });
  });
};

exports.getprofile = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.json({ user });
};

// update profile
exports.updateProfile = async (req, res) => {
  const { userName, userPassword, email, phone } = req.body;
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!req.session.user) {
    return res.redirect('/login');
  }
  user.userName = userName;
  user.userPassword = userPassword;
  user.email = email;
  user.phone = phone;
  await user.save();
  res.json({ user });
};

// delete frofile 
exports.deleteProfile = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  try{
  const user = await User.findOne({ where: { id: req.params.id } });
  await user.destroy();
  res.json({ message: 'User deleted successfully' });
  }catch(err) {
    res.status(500).json({ error: err.message });
  }
}
