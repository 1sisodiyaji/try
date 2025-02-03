const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const sendOtpEmail = async(userEmail, otp, expiryTime) => {
    if (!userEmail || !otp || !expiryTime) {
        console.log('Missing required parameters');
        return;
    }
    try {
        const mailOptions = {
            from: 'Support@nutron.com',
            to: userEmail,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}. It will expire on ${expiryTime}.`
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('OTP email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.error('Error sending OTP email:', error);
        res.status(500).send({
            statuscode: 500,
            message: err.message || "Failed to send mail error",
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            Evtype: "FAILED",
        });
    }
};

module.exports = sendOtpEmail;
