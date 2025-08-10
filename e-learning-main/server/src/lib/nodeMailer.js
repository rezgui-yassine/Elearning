const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const UserOTPVerification = require("../models/UerOTPVerification");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "yassinedebich214@gmail.com",
    pass: "ubys bnok ansx abpv",
  },
});

const sendConfirmationEmail = async (email, activationCode) => {
  transporter
    .sendMail({
      from: "yassinedebich214@gmail.com",
      to: email,
      subject: "Activation code",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
              /* Reset default margin and padding */
              body, h1, h2, p {
                  margin: 0;
                  padding: 0;
              }
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f2f2f2;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              .card {
                  background: #373B44;  /* fallback for old browsers */
                  background: -webkit-linear-gradient(to right, #4286f4, #373B44);  /* Chrome 10-25, Safari 5.1-6 */
                  background: linear-gradient(to right, #4286f4, #373B44);  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                  border-radius: 10px;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                  color: #ffffff;
              }
              h1 {
                  font-size: 24px;
                  margin-bottom: 20px;
              }
              h2 {
                  font-size: 20px;
                  margin-bottom: 10px;
              }
              p {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
              a {
                  display: inline-block;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                  transition: background-color 0.3s ease;
              }
              a:hover {
                  background-color: #0056b3;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="card">
                  <h1>Activation Code</h1>
                  <h2>Bonjour</h2>
                  <p>Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
                  <a href="http://localhost:5173/confirm/${activationCode}">Activer</a>
              </div>
          </div>
      </body>
      </html>
    `,
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { transporter, sendConfirmationEmail };
