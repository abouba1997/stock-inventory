const { mailTransporter } = require("./mailTransporter");

const sendMail = (user) => {
  const transporter = mailTransporter();

  const mailOptions = {
    from: '"My app" <abouba.sang@outlook.com>',
    to: user.email,
    subject: "Verifier votre email...",
    html: `<p>Salut ${user.name}, verifiez votre adresse email en clickant sur le lien suivant:</p>
                <a href='http:/localhost:5000/verify-email?emailToken=${user.emailToken}'>Verifier votre email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("L'email de verification envoyee");
    }
  });
};

module.exports = { sendMail };
