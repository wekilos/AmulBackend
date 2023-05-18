var Sequelize = require("sequelize");
const { Material } = require("../../models");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
  Material.findAll({
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
  const data = await Material.findOne({ where: { id: id } });
  if (data) {
    Material.findOne({
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
    res.send("BU ID boyuncha Material yok!");
  }
};

const create = async (req, res) => {
  const { name_en, name_ru } = req.body;

  Material.create({
    name_en,
    name_ru,
  })
    .then(async (data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json("create Material:", err);
    });
};

const update = async (req, res) => {
  const { name_en, name_ru, id } = req.body;

  const data = await Material.findOne({ where: { id: id } });
  if (!data) {
    res.json("Bu Id boyuncha Material yok!");
  } else {
    Material.update(
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
        res.json("update Material:", err);
      });
  }
};

const Destroy = async (req, res) => {
  const { id } = req.params;
  let data = await Material.findOne({ where: { id: id } });
  if (data) {
    Material.destroy({
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
    res.json("Bu Id Boyuncha Material yok!");
  }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.Destroy = Destroy;
