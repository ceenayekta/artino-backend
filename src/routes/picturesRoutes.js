const express = require("express");
const picturesController = require("../controllers/picturesController");
const authorization = require("../middlewares/authorization");

const router = express.Router();

router.get("/", picturesController.retrieve);
router.get("/:id", picturesController.retrieveOne);
router.get("/:isMainPicture/:productId", picturesController.retrieveGallery);
router.post("/", authorization, picturesController.create);
router.put("/:id", authorization, picturesController.update);
router.delete("/:id", authorization, picturesController.remove);

module.exports = router;
