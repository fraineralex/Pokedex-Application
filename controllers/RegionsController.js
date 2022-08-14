const Regions = require("../models/Regions");

exports.GetRegionsList = (req, res, next) => {
  Regions.findAll()
    .then((result) => {
      const regions = result.map((result) => result.dataValues);

      res.render("regions/admin-regions", {
        pageTitle: "regions",
        regionsActive: true,
        regions: regions,
        hasRegions: regions.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreateRegions = (req, res, next) => {
  res.render("regions/save-regions", {
    pageTitle: "Create regions",
    regionsActive: true,
    editMode: false,
  });
};

exports.PostCreateRegions = (req, res, next) => {
  const name = req.body.Name;
  const description = req.body.Description;

  Regions.create({ name: name, description: description })
    .then((result) => {
      res.redirect("/admin-regions");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditRegions = (req, res, next) => {
  const edit = req.query.edit;
  const regionId = req.params.regionId;

  if (!edit) {
    return res.redirect("/admin-regions");
  }

  Regions.findOne({ where: { regionId: regionId } })
    .then((result) => {
      const region = result.dataValues;

      if (!region) {
        return res.redirect("/admin-regions");
      }
      res.render("regions/save-regions", {
        pageTitle: "Edit regions",
        regionsActive: true,
        editMode: edit,
        region: region,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditRegions = (req, res, next) => {
  const name = req.body.Name;
  const description = req.body.Description;
  const regionId = req.body.RegionId;

  Regions.update({ name: name, description: description }, { where: { regionId: regionId } })
    .then((result) => {
      return res.redirect("/admin-regions");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteRegions = (req, res, next) => {
  const id = req.body.RegionId;

  Regions.destroy({ where: { regionId: id } })
    .then((result) => {
      return res.redirect("/admin-regions");
    })
    .catch((err) => {
      console.log(err);
    });
};
