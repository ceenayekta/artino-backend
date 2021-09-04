const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const authorization = require("../middlewares/authorization");

const router = express.Router();

router.get("/", categoriesController.retrieve);
router.get("/:id", categoriesController.retrieveOne);
router.post("/", authorization, categoriesController.create);
router.put("/:id", authorization, categoriesController.update);
router.delete("/:id", authorization, categoriesController.remove);

module.exports = router;
