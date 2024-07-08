import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.smtp_user,
      pass: config.smtp_password,
    },
  });

  await transporter.sendMail({
    from: config.smtp_user,
    to,
    subject: 'Reset your password within 10 mins!',
    text: '',
    html,
  });
};
