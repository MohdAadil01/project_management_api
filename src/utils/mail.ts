import Mailgen from "mailgen";
import nodemailer from "nodemailer";

export const emailVerificationMailgenContent = (
  username: string,
  verificationUrl: string
) => {
  const email = {
    body: {
      name: username,
      intro: "Welcome to our App! we're excited to have you onboard.",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#22BC66",
          text: "Confirm",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  return email;
};

export const forgotPasswordMailgenContent = (
  username: string,
  passwordResetUrl: string
) => {
  const email = {
    body: {
      name: username,
      intro: "We got a request to reset the password.",
      action: {
        instructions:
          "To reset your password please click on the following button",
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  return email;
};

export const sendMail = async (options: {
  mailGenContent: any;
  toEmail: string;
  subject: string;
}) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Product Management App",
      link: "https://localhost:3000",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailGenContent);
  const emailHTML = mailGenerator.generate(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_USER,
    },
  });

  const mail = {
    from: "mymail@gmail.com",
    to: options.toEmail,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.log("Error while sending mail..." + error);
  }
};
