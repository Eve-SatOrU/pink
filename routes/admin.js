const express = require('express');
const session = require('express-session');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/register' ,adminController.postAdminRegistration);
router.post('/login', adminController.postLogin);
router.delete('/logout',adminController.logout);
router.delete('/delete-user/:id', adminController.deleteUser);
router.get('/dashboard', adminController.getDashboard);
router.put('/help/:id', adminController.updateHelpRequest);






module.exports = router;