const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Define the email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).json({ error: 'Failed to send email.' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});