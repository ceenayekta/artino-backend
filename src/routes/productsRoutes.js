const express = require("express");
const productsController = require("../controllers/productsController");
const authorization = require("../middlewares/authorization");

const router = express.Router();

router.get("/", productsController.retrieve);
router.get("/:id", productsController.retrieveOne);
router.post("/", authorization, productsController.create);
router.put("/:id", authorization, productsController.update);
router.delete("/:id", authorization, productsController.remove);

module.exports = router;
