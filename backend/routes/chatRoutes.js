const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.js');
const { addToGroup,renameGroup, accessChat, fetchChats, createGroupChat, removeFromGroup } = require('../controllers/chatController.js');

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/groupadd').put(protect,addToGroup);
router.route('/groupremove').put(protect,removeFromGroup);

module.exports = router;