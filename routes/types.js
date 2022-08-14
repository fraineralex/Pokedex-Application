const express = require("express");

const adminTypesController =require("../Controllers/TypesController");

const router = express.Router();

router.get("/admin-types", adminTypesController.GetAdminTypes);

router.get("/create-type", adminTypesController.GetCreateTypes);
router.post("/create-type", adminTypesController.PostCreateTypes);

router.get("/edit-type/:TypeId", adminTypesController.GetEditTypes);
router.post("/edit-type", adminTypesController.PostEditTypes);

router.post("/delete-type", adminTypesController.PostDeleteTypes);

module.exports = router;