const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

/**
 * Sends an SMS to the specified phone number.
 * 
 * @param {string} to - Recipient phone number in E.164 format (e.g., +919876543210)
 * @param {string} message - The message body to send
 */
const sendSMS = async (to, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: fromPhone,
            to: to
        });

        console.log(`✅ SMS sent to ${to}. SID: ${response.sid}`);
    } catch (error) {
        console.error(`❌ Failed to send SMS to ${to}:`, error.message);
        throw error;
    }
};

module.exports = sendSMS;