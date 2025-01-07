import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

// export const emailTransporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.PASSWORD_USER,
//   },
//   secure: true,
//   host: "smtp.gmail.com",
//   tls: {
//     rejectUnauthorized: false,
//   },
//   port: 465,
// });

export const emailTransporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);
