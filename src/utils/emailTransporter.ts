import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "afridhoikhsan@gmail.com",
    pass: "hruo yplz ammz vpyk",
  },
  secure: false,
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
});
