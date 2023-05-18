var Sequelize = require("sequelize");
const { Color } = require("../../models");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
  Color.findAll({
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
  const data = await Color.findOne({ where: { id: id } });
  if (data) {
    Color.findOne({
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
    res.send("BU ID boyuncha Color yok!");
  }
};

const create = async (req, res) => {
  const { name_en, name_ru } = req.body;

  Color.create({
    name_en,
    name_ru,
  })
    .then(async (data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json("create Color:", err);
    });
};

const update = async (req, res) => {
  const { name_en, name_ru, id } = req.body;

  const data = await Color.findOne({ where: { id: id } });
  if (!data) {
    res.json("Bu Id boyuncha Color yok!");
  } else {
    Color.update(
      {
        name_en,
        name_ru,
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
        res.json("update Color:", err);
      });
  }
};

const Destroy = async (req, res) => {
  const { id } = req.params;
  let data = await Color.findOne({ where: { id: id } });
  if (data) {
    Color.destroy({
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
    res.json("Bu Id Boyuncha Color yok!");
  }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.Destroy = Destroy;
