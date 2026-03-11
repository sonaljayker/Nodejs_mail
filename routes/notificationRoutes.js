const express = require('express');
const router = express.Router();
const {
    sendNotification,
    getUserNotifications
} = require('../controller/notificationController');

router.post('/notification', sendNotification);
router.get('/users/:id/notifications', getUserNotifications);

module.exports = router;