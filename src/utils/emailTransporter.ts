import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "afridhoikhsan@gmail.com",
    pass: "hruo yplz ammz vpyk",
  },
  secure: false,
  host: "smtp.gmail.com",
  tls: {
    rejectUnauthorized: false,
  },
  port: 587,

});
