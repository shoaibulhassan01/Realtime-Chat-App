const express = require('express');
const {sendMessage,getMessage} = require('../controllers/messageController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.route('/send/:id').post(isAuthenticated,sendMessage)
router.route('/:id').get(isAuthenticated,getMessage)
// router.route('/:id').get(isAuthenticated )

module.exports = router;