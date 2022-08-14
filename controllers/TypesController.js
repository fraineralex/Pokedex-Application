const Types = require("../models/Types");

exports.GetAdminTypes = (req, res, next) => {

    Types.findAll().then((result)=>{
  
      const types = result.map((result)=> result.dataValues)
  
      res.render("types-pokemon/admin-types-pokemon",{
          pageTitle: "Tipos de Pokemones",
          typesActive: true,
          types: types,
          hasTypes: types.length > 0,
  
      });
  
  }).catch((er)=>{
  
      console.log(err);
  
  })
  };
  
    exports.GetCreateTypes = (req, res, next) => {
      res.render("types-pokemon/save-types-pokemon", {
        pageTitle: "Registrar Types",
        typesActive: true,
        editMode: false,
      });
  };
  
  exports.PostCreateTypes = (req, res, next) => {
      const name = req.body.Name;
      const description = req.body.Description;
  
      Types.create({name: name, description: description}).then((result)=>{
          res.redirect("/admin-types");
      }).catch((err)=>{
          console.log(err);
      });
  
  };
  
  exports.GetEditTypes = (req, res, next) => {
  
      const edit = req.query.edit;
      const id = req.params.TypeId;
  
      if (!edit) {
        return res.redirect("/");
      }
  
      Types.findOne({where: {typeId: id}}).then((result)=>{
  
        const type = result.dataValues;
  
        if(!type){
  
          return res.redirect("/");
  
        }
  
        res.render("types-pokemon/save-types-pokemon", {
          pageTitle: "Actualizar Tipos de Pokemones",
          typesActive: true,
          editMode: edit,
          type: type,
        });
  
      }).catch((err)=>{
        console.log(err);
      });
  
  };
  
  
  exports.PostEditTypes = (req, res, next) => {
  
      const id = req.body.TypeId;
      const name = req.body.Name;
      const description = req.body.Description;
  
      Types.update({name: name, description: description}, {where: {typeId: id}}).then((result)=>{
  
        res.redirect("/admin-types")
  
      }).catch((err)=>{
        console.log(err);
      })
  
  };
  
  exports.PostDeleteTypes = (req, res, next) => {
      const id = req.body.TypeId;
  
      Types.destroy({where: {typeId: id}});
  
      res.redirect("/admin-types")
  };
  