var Sequelize = require("sequelize");
const { Width } = require("../../models");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
  Width.findAll({
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
  const data = await Width.findOne({ where: { id: id } });
  if (data) {
    Width.findOne({
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
    res.send("BU ID boyuncha Width yok!");
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  Width.create({
    name,
  })
    .then(async (data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json("create Width:", err);
    });
};

const update = async (req, res) => {
  const { name, id } = req.body;

  const data = await Width.findOne({ where: { id: id } });
  if (!data) {
    res.json("Bu Id boyuncha Width yok!");
  } else {
    Width.update(
      {
        name,
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
        res.json("update Width:", err);
      });
  }
};

const Destroy = async (req, res) => {
  const { id } = req.params;
  let data = await Width.findOne({ where: { id: id } });
  if (data) {
    Width.destroy({
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
    res.json("Bu Id Boyuncha Width yok!");
  }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.Destroy = Destroy;
