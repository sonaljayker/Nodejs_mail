const Notification = require('../models/Notification');
const sendEmail = require('../service/emailService');
const sendSMS = require('../service/smsService');
const sendInApp = require('../service/inAppService');

exports.sendNotification = async (req, res) => {
    const { userId, type, message } = req.body;

    let status = "sent";

    try {
        if (type === "email") await sendEmail(userId, message);
        else if (type === "sms") await sendSMS(userId, message);
        else if (type === "in-app") await sendInApp(userId, message);
        else return res.status(400).json({ error: "Invalid type" });
    } catch (err) {
        status = "failed";
    }

    await Notification.createNotification(userId, type, message, status);

    res.status(201).json({
        success: true,
        status
    });
};

exports.getUserNotifications = async (req, res) => {
    const { id } = req.params;

    const notifications = await Notification.getUserNotifications(id);

    res.json(notifications);
};