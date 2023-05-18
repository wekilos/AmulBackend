var Sequelize = require("sequelize");
const { Config } = require("../../models");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
  Config.findAll({
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
  const data = await Config.findOne({ where: { id: id } });
  if (data) {
    Config.findOne({
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
    res.send("BU ID boyuncha Config yok!");
  }
};

const create = async (req, res) => {
  const { phone, address_en, address_ru, email } = req.body;

  Config.create({
    phone,
    address_en,
    address_ru,
    email,
  })
    .then(async (data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json("create Config:", err);
    });
};

const update = async (req, res) => {
  const { phone, address_en, address_ru, email, id } = req.body;

  const data = await Config.findOne({ where: { id: id } });
  if (!data) {
    res.json("Bu Id boyuncha Config yok!");
  } else {
    Config.update(
      {
        phone,
        address_en,
        address_ru,
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
        res.json("update Config:", err);
      });
  }
};

const Destroy = async (req, res) => {
  const { id } = req.params;
  let data = await Config.findOne({ where: { id } });
  if (data) {
    Config.destroy({
      where: {
        id,
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
    res.json("Bu Id Boyuncha Config yok!");
  }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.Destroy = Destroy;
