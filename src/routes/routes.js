const express = require("express");
const adminRoutes = require("./adminRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const picturesRoutes = require("./picturesRoutes");
const productsRoutes = require("./productsRoutes");

// ROUTES FOR your APIs -------------------------------
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/pictures", picturesRoutes);

//
module.exports = router;
