import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASSWORD_USER,
  },
  secure: true,
  host: "smtp.gmail.com",
  tls: {
    rejectUnauthorized: false,
  },
  port: 465,
});
