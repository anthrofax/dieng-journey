import { emailTransporter } from "./emailTransporter";

interface sendEmailParamsType {
  html: string;
  emailReceiver: string;
  subject: string;
  returnedSuccessData: any;
}

export async function sendEmail({
  html,
  emailReceiver,
  subject,
  returnedSuccessData,
}: sendEmailParamsType) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailReceiver,
      subject,
      html,
    };

    const res = await new Promise((resolve, reject) => {
      emailTransporter.sendMail(mailOptions, (error) => {
        if (error) {
          reject(`Gagal mengirim OTP. Coba lagi. ${error}`);
        }
      });
      resolve(returnedSuccessData);
    });

    
    return res;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(`${error}`);
  }
}
