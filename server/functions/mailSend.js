var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "DemiryolExpress@gmail.com",
    pass: "sibvyljvgbcvlujp",
  },
});

const SendMail = async (data) => {
  console.log(data);
  var mailOptions = {
    from: "DemiryolExpress@gmail.com",
    to: data?.email,
    subject: data?.subject,
    text: data?.text,
  };

  let result;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      result = "error";
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const ReciveMail = async (data) => {
  console.log(data);
  var mailOptions = {
    from: "DemiryolExpress@gmail.com",
    to: "DemiryolExpress@gmail.com",
    subject: data?.subject,
    text:
      "From this mail:" +
      data?.email +
      "\n" +
      "Phone number:" +
      data?.phone +
      "\n" +
      "Full name:" +
      data?.fullname +
      "\n" +
      data?.text +
      "\n",
  };

  let result;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      result = "error";
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.SendMail = SendMail;
exports.ReciveMail = ReciveMail;
