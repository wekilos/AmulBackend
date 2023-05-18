const express = require("express");
// const { verify } = require("crypto");
const Func = require("../functions/functions");
const sequelize = require("../../config/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cache = require("../../config/node-cache");
const path = require("path");

// Controllers
const BannerControllers = require("../controller/bannerController");
const CarouselControllers = require("../controller/carouselController");
const CategoryControllers = require("../controller/categoryController");
const ColorControllers = require("../controller/colorController");
const ConfigControllers = require("../controller/configController");
const LengthControllers = require("../controller/lengthController");
const MaterialControllers = require("../controller/materialController");
const ProductControllers = require("../controller/productController");
const SubscribeControllers = require("../controller/subscribeController");
const WidthControllers = require("../controller/widthController");

// For Token

const verifyToken = async (req, res, next) => {
  const bearerHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, Func.Secret(), (err, authData) => {
      if (err) {
        res.json("err");
        console.log(err);
      } else {
        req.id = authData.id;
      }
    });
    next();
  } else {
    res.send("<center><h2>This link was not found! :(</h2></center>");
  }
};

// // Routes

// Config Routes
router.get("/config/all", cache.get, ConfigControllers.getAll, cache.set);
router.get("/config/:id", cache.get, ConfigControllers.getOne, cache.set);
router.post("/config/create", ConfigControllers.create);
router.patch("/config/update", ConfigControllers.update);
router.delete("/config/destroy/:id", ConfigControllers.Destroy);

// Banner Routes
router.get("/banner/all", cache.get, BannerControllers.getAll, cache.set);
router.get("/banner/:id", cache.get, BannerControllers.getOne, cache.set);
router.post("/banner/create", BannerControllers.create);
router.patch("/banner/update/:id", BannerControllers.update);
router.delete("/banner/destroy/:id", BannerControllers.Destroy);

// Carousel Routes
router.get("/carousel/all", cache.get, CarouselControllers.getAll, cache.set);
router.get("/carousel/:id", cache.get, CarouselControllers.getOne, cache.set);
router.post("/carousel/create", CarouselControllers.create);
router.patch("/carousel/update/:id", CarouselControllers.update);
router.delete("/carousel/destroy/:id", CarouselControllers.Destroy);

// Category Routes
router.get("/category/all", cache.get, CategoryControllers.getAll, cache.set);
router.get("/category/:id", cache.get, CategoryControllers.getOne, cache.set);
router.post("/category/create", CategoryControllers.create);
router.patch("/category/update", CategoryControllers.update);
router.delete("/category/destroy/:id", CategoryControllers.Destroy);

// Color Routes
router.get("/color/all", cache.get, ColorControllers.getAll, cache.set);
router.get("/color/:id", cache.get, ColorControllers.getOne, cache.set);
router.post("/color/create", ColorControllers.create);
router.patch("/color/update", ColorControllers.update);
router.delete("/color/destroy/:id", ColorControllers.Destroy);

// Length Routes
router.get("/length/all", cache.get, LengthControllers.getAll, cache.set);
router.get("/length/:id", cache.get, LengthControllers.getOne, cache.set);
router.post("/length/create", LengthControllers.create);
router.patch("/length/update", LengthControllers.update);
router.delete("/length/destroy/:id", LengthControllers.Destroy);

// Material Routes
router.get("/material/all", cache.get, MaterialControllers.getAll, cache.set);
router.get("/material/:id", cache.get, MaterialControllers.getOne, cache.set);
router.post("/material/create", MaterialControllers.create);
router.patch("/material/update", MaterialControllers.update);
router.delete("/material/destroy/:id", MaterialControllers.Destroy);

// Width Routes
router.get("/width/all", cache.get, WidthControllers.getAll, cache.set);
router.get("/width/:id", cache.get, WidthControllers.getOne, cache.set);
router.post("/width/create", WidthControllers.create);
router.patch("/width/update", WidthControllers.update);
router.delete("/width/destroy/:id", WidthControllers.Destroy);

// Subscribe Routes
router.get("/subscribe/all", cache.get, SubscribeControllers.getAll, cache.set);
router.get("/subscribe/:id", cache.get, SubscribeControllers.getOne, cache.set);
router.post("/subscribe/create", SubscribeControllers.create);
router.patch("/subscribe/update", SubscribeControllers.update);
router.delete("/subscribe/destroy/:id", SubscribeControllers.Destroy);

// Product Routes
router.get("/product/all", cache.get, ProductControllers.getAll, cache.set);
router.get("/product/:id", cache.get, ProductControllers.getOne, cache.set);
router.post("/product/create", ProductControllers.create);
router.post("/product/img/upload/:id", ProductControllers.uploadImg);
router.patch("/product/update", ProductControllers.update);
router.delete("/product/destroy/:id", ProductControllers.Destroy);
router.delete("/product/img/destroy/:id", ProductControllers.DestroyImg);

module.exports = router;
