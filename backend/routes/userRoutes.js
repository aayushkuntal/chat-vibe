const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.js');
const { registerUser, authUser, allUsers } = require('../controllers/userController.js');

router.route('/').post(registerUser).get(protect, allUsers);
router.route('/login').post(authUser);


module.exports = router;
