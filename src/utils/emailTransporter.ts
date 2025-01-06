import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "afridhoikhsan@gmail.com",
    pass: "hruo yplz ammz vpyk",
  },
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
