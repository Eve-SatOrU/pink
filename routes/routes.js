
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/register' , controller.postRegister);
router.post('/login', controller.postLogin);
router.post('/logout', controller.postLogout);
//profile
router.get('/profile/:id', controller.getprofile);
router.put('/profile/:id', controller.updateProfile);
router.delete('/profile/:id', controller.deleteProfile);

module.exports = router;