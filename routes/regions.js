const express = require('express');

const router = express.Router();

const regionsController = require('../controllers/RegionsController');


router.get("/admin-regions", regionsController.GetRegionsList);
router.get("/create-region", regionsController.GetCreateRegions);
router.post("/create-region", regionsController.PostCreateRegions);
router.get("/edit-region/:regionId", regionsController.GetEditRegions);
router.post("/edit-region", regionsController.PostEditRegions);
router.post("/delete-region", regionsController.PostDeleteRegions);


module.exports = router;
