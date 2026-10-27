const nodemailer = require('nodemailer');

// Sends through SMTP when SMTP_HOST is set; otherwise prints the mail to the server console (dev mode)
module.exports = async function sendMail({ to, subject, text }) {
  if (!process.env.SMTP_HOST) {
    console.log(`\n[mail not sent - SMTP not configured]\nTo: ${to}\nSubject: ${subject}\n${text}\n`);
    return;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to, subject, text });
};
