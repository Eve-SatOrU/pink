const User = require('../models/user');
const Admin = require('../models/admin');
const HelpRequest = require('../models/HelpRequest');
const bcrypt = require('bcrypt');

exports.postAdminRegistration = async (req, res, next) => {
  const { userName, userPassword } = req.body;
  try {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already registered' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const admin = await Admin.create({
      userName,
      userPassword: hashedPassword
    });

    res.redirect('/admin/login');
  } catch (error) {
    console.error(error);
  }
};

exports.postLogin= (async (req, res) => {
  const { userName, userPassword } = req.body;
  const admin = await Admin.findOne({ where: { userName } });
  if (!admin) {
    return res.status(500).send('Something broke!');
  }
  const isPasswordValid = await bcrypt.compare(userPassword, admin.userPassword);
  if (!isPasswordValid) {
    return res.status(500).send('your password wrong try again!');
  }
  else{
    req.session.admin = admin;
    req.session.id = admin.id; 
    res.redirect('/admin/dashboard');
      }
});
  exports.logout=async(req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
}; 

  exports.getDashboard = async (req, res, next) => {
    try {
      const admin = req.session.admin;
      if (req.session.admin) {
        const users = await User.findAll();
        const HelpRequests = await HelpRequest.findAll();
        res.json({ users, HelpRequests });
      } else {
        res.redirect('/admin/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    console.log("User ID: ", id);
    if (!req.session.admin) {
      return res.redirect('/admin/login');
    }
  
    User.destroy({
      where: {
        id: id,
      }
    })
    .then(() => {
      if (req.session.user && req.session.user.id === id) {
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
          }
          res.redirect('/login');
        });
      } else {
        res.redirect('/admin/dashboard');
      }
    })
    .catch(err => console.log(err));
  };


exports.updateHelpRequest = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // "open", "in progress", "closed"
    if (!req.session.admin) {
        return res.status(401).json({ error: 'You need to be logged in as an admin to update help request status' });
    }
    try {
      const helpRequest = await HelpRequest.findByPk(id);
  
      if (!helpRequest) {
        return res.status(404).json({ error: 'Help request not found' });
      }
  
      helpRequest.status = status;
      await helpRequest.save();
  
      res.status(200).json({ message: 'Help request status updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update help request status' });
    }
};
