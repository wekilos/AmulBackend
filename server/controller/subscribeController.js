var Sequelize = require("sequelize");
const { Subscribe } = require("../../models");
const Op = Sequelize.Op;
const fs = require("fs");
const SendMail = require("../functions/mailSend");

const getAll = async (req, res) => {
  Subscribe.findAll({
    order: [["id", "DESC"]],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: err });
    });
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await Subscribe.findOne({ where: { id: id } });
  if (data) {
    Subscribe.findOne({
      where: {
        id: id,
      },
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: err });
      });
  } else {
    res.send("BU ID boyuncha Subscribe yok!");
  }
};

const create = async (req, res) => {
  const { email } = req.body;

  Subscribe.create({
    email,
  })
    .then(async (data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json("create Subscribe:", err);
    });
};

const update = async (req, res) => {
  const { email, id } = req.body;

  const data = await Subscribe.findOne({ where: { id: id } });
  if (!data) {
    res.json("Bu Id boyuncha Subscribe yok!");
  } else {
    Subscribe.update(
      {
        email,
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then(async (data) => {
        res.json("updated");
      })
      .catch((err) => {
        console.log(err);
        res.json("update Subscribe:", err);
      });
  }
};

const sendOnePerson = async (req, res) => {
  const { subject, text, email } = req.body;
  await SendMail.SendMail({ subject: subject, text: text, email: email });
  res.json("ugradyldy!");
};

const sendAllPerson = async (req, res) => {
  const { subject, text } = req.body;
  let data = await Subscribe.findAll();

  data.map(async (item) => {
    await SendMail.SendMail({
      subject: subject,
      text: text,
      email: item.email,
    });
  });
  res.json("ugradyldy!");
};

const recivedOnePersonMail = async (req, res) => {
  const { fullname, phone, text, email } = req.body;

  await SendMail.ReciveMail({
    subject: "From clients",
    text: text,
    email: email,
    phone: phone,
    fullname: fullname,
  });
  res.json("ugradyldy!");
};

const Destroy = async (req, res) => {
  const { id } = req.params;
  let data = await Subscribe.findOne({ where: { id: id } });
  if (data) {
    Subscribe.destroy({
      where: {
        id: id,
      },
    })
      .then(() => {
        res.json("destroyed!");
      })
      .catch((err) => {
        console.log(err);
        res.json({ err: err });
      });
  } else {
    res.json("Bu Id Boyuncha Subscribe yok!");
  }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.Destroy = Destroy;
exports.sendOnePerson = sendOnePerson;
exports.sendAllPerson = sendAllPerson;
exports.recivedOnePersonMail = recivedOnePersonMail;
