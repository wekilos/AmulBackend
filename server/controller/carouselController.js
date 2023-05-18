var Sequelize = require("sequelize");
const { Carousel } = require("../../models");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
  Carousel.findAll({
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
  const data = await Carousel.findOne({ where: { id: id } });
  if (data) {
    Carousel.findOne({
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
    res.send("BU ID boyuncha Carousel yok!");
  }
};

const create = async (req, res) => {
  let randomNumber = Math.floor(Math.random() * 999999999999);
  let img_direction = `./uploads/` + randomNumber + `${req.files?.img.name}`;
  fs.writeFile(img_direction, req.files.img.data, function (err) {
    console.log(err);
  });

  Carousel.create({
    img: img_direction,
  })
    .then(async (data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json("upload Carousel:", err);
    });
};

const update = async (req, res) => {
  const { id } = req.query;

  const data = await Carousel.findOne({ where: { id: id } });
  if (!data) {
    res.json("Bu Id boyuncha Config yok!");
  } else {
    let randomNumber = Math.floor(Math.random() * 999999999999);
    let img_direction = `./uploads/` + randomNumber + `${req.files?.img.name}`;
    fs.writeFile(img_direction, req.files.img.data, function (err) {
      console.log(err);
    });
    fs.unlink(data.img, function (err) {
      if (err) throw err;
    });
    Carousel.update(
      {
        img: img_direction,
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
        res.json("update Carousel:", err);
      });
  }
};

const Destroy = async (req, res) => {
  const { id } = req.params;
  let data = await Carousel.findOne({ where: { id } });
  if (data) {
    Carousel.destroy({
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
    res.json("Bu Id Boyuncha Carousel yok!");
  }
};
exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.update = update;
exports.Destroy = Destroy;
