const express = require("express");
const picturesController = require("../controllers/picturesController");

const router = express.Router();

router.get("/", picturesController.retrieve);
router.get("/:id", picturesController.retrieveOne);
router.get("/:isMainPicture/:productId", picturesController.retrieveGallery);
router.post("/", picturesController.create);
router.put("/:id", picturesController.update);
router.delete("/:id", picturesController.remove);

module.exports = router;
