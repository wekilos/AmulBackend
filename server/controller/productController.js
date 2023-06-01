var Sequelize = require("sequelize");
const {
  Product,
  Length,
  Width,
  Material,
  Color,
  Category,
  Img,
} = require("../../models");
const Op = Sequelize.Op;
const fs = require("fs");

const getAll = async (req, res) => {
  const { materials, categories, widths, lengths, colors } = req.query;
  const Materials =
    materials &&
    (materials?.length > 0
      ? {
          [Op.or]: [
            {
              MaterialId: {
                [Sequelize.Op.in]: materials,
              },
            },
          ],
        }
      : null);

  const Categories =
    categories &&
    (categories?.length > 0
      ? {
          [Op.or]: [
            {
              CategoryId: {
                [Sequelize.Op.in]: categories,
              },
            },
          ],
        }
      : null);

  const Widths =
    widths &&
    (widths?.length > 0
      ? {
          [Op.or]: [
            {
              WidthId: {
                [Sequelize.Op.in]: widths,
              },
            },
          ],
        }
      : null);

  const Lengths =
    lengths &&
    (lengths?.length > 0
      ? {
          [Op.or]: [
            {
              LengthId: {
                [Sequelize.Op.in]: lengths,
              },
            },
          ],
        }
      : null);

  const Colors =
    colors &&
    (colors?.length > 0
      ? {
          [Op.or]: [
            {
              ColorId: {
                [Sequelize.Op.in]: colors,
              },
            },
          ],
        }
      : null);

  Product.findAll({
    include: [
      {
        model: Length,
      },
      {
        model: Width,
      },
      {
        model: Material,
      },
      {
        model: Color,
      },
      {
        model: Category,
      },
      {
        model: Img,
      },
    ],
    where: {
      [Op.and]: [Materials, Categories, Widths, Lengths, Colors],
    },
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
  const data = await Product.findOne({ where: { id: id } });
  if (data) {
    Product.findOne({
      include: [
        {
          model: Length,
        },
        {
          model: Width,
        },
        {
          model: Material,
        },
        {
          model: Color,
        },
        {
          model: Category,
        },
        {
          model: Img,
        },
      ],
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
    res.send("BU ID boyuncha Product yok!");
  }
};

const create = async (req, res) => {
  const {
    name_en,
    name_ru,
    code,
    description_en,
    description_ru,
    razmer_en,
    razmer_ru,
    ColorId,
    LengthId,
    WidthId,
    CategoryId,
    MaterialId,
  } = req.body;

  Product.create({
    name_en,
    name_ru,
    code,
    description_en,
    description_ru,
    razmer_en,
    razmer_ru,
    ColorId,
    LengthId,
    WidthId,
    CategoryId,
    MaterialId,
  })
    .then(async (data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json("create Product:", err);
    });
};

const uploadImg = async (req, res) => {
  const { id } = req.params;
  console.log("filessss===>>>>>>", req.files.img);
  const files =
    req.files.img.constructor === Array ? req.files.img : [req.files.img];
  console.log("filessss>>>>>>", typeof files);
  console.log("files", files);

  let imgs = [];
  const upl = (img) => {
    let randomNumber = Math.floor(Math.random() * 999999999999);
    let img_direction = `./api/uploads/` + randomNumber + `${img.name}`;
    fs.writeFile(img_direction, img.data, function (err) {
      console.log(err);
    });
    imgs.push({ ProductId: id, img: img_direction });
  };

  files?.map((item) => {
    upl(item);
  });

  imgs.length > 0
    ? Img.bulkCreate(imgs, { returning: true })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        })
    : res.json("Images did not send by User to Server!");
};

const update = async (req, res) => {
  const {
    name_en,
    name_ru,
    code,
    description_en,
    description_ru,
    razmer_en,
    razmer_ru,
    ColorId,
    LengthId,
    WidthId,
    CategoryId,
    MaterialId,
    id,
  } = req.body;

  console.log(req.body);
  const data = await Product.findOne({ where: { id: id } });
  if (!data) {
    res.json("Bu Id boyuncha Product yok!");
  } else {
    console.log("data::::::::::::s", data);
    Product.update(
      {
        name_en,
        name_ru,
        code,
        description_en,
        description_ru,
        razmer_en,
        razmer_ru,
        ColorId,
        LengthId,
        WidthId,
        CategoryId,
        MaterialId,
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
        res.json("update Product:", err);
      });
  }
};

const Destroy = async (req, res) => {
  const { id } = req.params;
  let data = await Product.findOne({ where: { id: id } });
  if (data) {
    Product.destroy({
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
    res.json("Bu Id Boyuncha Product yok!");
  }
};

const DestroyImg = async (req, res) => {
  const { id } = req.params;
  let data = await Img.findOne({ where: { id: id } });
  if (data) {
    Img.destroy({
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
    res.json("Bu Id Boyuncha Img yok!");
  }
};

exports.getAll = getAll;
exports.getOne = getOne;
exports.create = create;
exports.uploadImg = uploadImg;
exports.update = update;
exports.Destroy = Destroy;
exports.DestroyImg = DestroyImg;
