const Pokemons = require("../models/Pokemons");
const Regions = require("../models/Regions");
const Types = require("../models/Types");
const { search } = require("../routes/pokemons");

exports.GetPokemonsHome = (req, res, next) => {
  Pokemons.findAll({include:[{model: Regions}, {model: Types}]})
    .then((result) => {
      const pokemons = result.map((result) => result.dataValues);  
      
      Regions.findAll()
      .then((result) => {
        const regions = result.map((result) => result.dataValues);

        res.render("pokemons/admin-pokemons", {
          pageTitle: "Pokemons",
          homeActive: true,
          pokemons: pokemons,
          admin: false,
          hasPokemons: pokemons.length > 0,
          search: true,
          regions: regions,

        });
      });

    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostSearchedPokemon = (req, res, next) => {
  const name = req.body.SearchVar;
    Pokemons.findAll({where: {name: name}, include: [{model: Regions}, {model: Types}]}).then((result) => {
      
      const pokemons = result.map((result) => result.dataValues);  
      
      Regions.findAll()
      .then((result) => {
        const regions = result.map((result) => result.dataValues);

        let pokemonName;
        if(pokemons.length > 0){
          pokemonName = pokemons[0].name;
        }

        res.render("pokemons/admin-pokemons", {
          pageTitle: "Pokemons",
          homeActive: true,
          pokemons: pokemons,
          admin: false,
          hasPokemons: pokemons.length > 0,
          search: true,
          regions: regions,
          searching: true,
          pokemonName: pokemonName
        });
      });

    })
    .catch((err) => {
      console.log(err);
    });
}


exports.PostFiltredPokemons = (req, res, next) => {
  const regionId = req.body.Filter;
    Pokemons.findAll({where: {regionRegionId: regionId}, include: [{model: Regions}, {model: Types}]}).then((result) => {
      
      const pokemons = result.map((result) => result.dataValues);  
      
      Regions.findAll()
      .then((result) => {
        const regions = result.map((result) => result.dataValues);

        let regionSelected;
        if(pokemons.length > 0){
          regionSelected = pokemons[0].region.name;
        }

        res.render("pokemons/admin-pokemons", {
          pageTitle: "Pokemons",
          homeActive: true,
          pokemons: pokemons,
          admin: false,
          hasPokemons: pokemons.length > 0,
          search: true,
          regions: regions,
          filter: true,
          regionSelected: regionSelected


        });
      });

    })
    .catch((err) => {
      console.log(err);
    });
};



exports.GetPokemonsList = (req, res, next) => {
  Pokemons.findAll({include:[{model: Regions}, {model: Types}]})
    .then((result) => {
      const pokemons = result.map((result) => result.dataValues);     

      res.render("pokemons/admin-pokemons", {
        pageTitle: "Pokemons",
        pokemonActive: true,
        pokemons: pokemons,
        admin: true,
        hasPokemons: pokemons.length > 0,
        item: "pokemon"
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetCreatePokemons = (req, res, next) => {
  Regions.findAll()
    .then((result) => {
      const regions = result.map((result) => result.dataValues);

      Types.findAll().then((result) => {
        const types = result.map((result) => result.dataValues);

        res.render("pokemons/save-pokemons", {
          pageTitle: "Create pokemons",
          homeActive: true,
          editMode: false,
          regions: regions,
          types: types,
          hasRegions: regions.length > 0,
          hasType: types.length > 0
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostCreatePokemons = (req, res, next) => {
  const name = req.body.Name;
  const imageUrl = req.body.ImageUrl;
  const regionId = req.body.RegionId;
  const typeId = req.body.TypeId;

  Pokemons.create({
    name: name,
    imageUrl: imageUrl,
    regionRegionId: regionId,
    typeTypeId: typeId,
  })
    .then((result) => {
      res.redirect("/admin-pokemons");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditPokemons = (req, res, next) => {
  const edit = req.query.edit;
  const id = req.params.pokemonsId;

  if (!edit) {
    return res.redirect("/");
  }

  Pokemons.findOne({ where: { id: id } })
    .then((result) => {
      const pokemon = result.dataValues;   

      if (!pokemon) {
        return res.redirect("/");
      }

      console.log(pokemon);

      Regions.findAll()
        .then((result) => {
          const regions = result.map((result) => result.dataValues);

          Types.findAll().then((result) => {
            const types = result.map((result) => result.dataValues);

            res.render("pokemons/save-pokemons", {
              pageTitle: "Edit pokemons",
              homeActive: true,
              editMode: edit,
              pokemon: pokemon,
              regions: regions,
              types: types,
              hasRegions: regions.length > 0,
              hasType: types.length > 0
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditPokemons = (req, res, next) => {
  const name = req.body.Name;
  const imageUrl = req.body.ImageUrl;
  const regionId = req.body.RegionId;
  const typeId = req.body.TypeId;
  const id = req.body.pokemonId;

  Pokemons.update(
    { name: name, description: imageUrl, regionRegionId: regionId, typeTypeId: typeId },
    { where: { id: id } }
  )
    .then((result) => {
      return res.redirect("/admin-pokemons");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeletePokemons = (req, res, next) => {
  const id = req.body.PokemonId;

  Pokemons.destroy({ where: { id: id } })
    .then((result) => {
      return res.redirect("/admin-pokemons");
    })
    .catch((err) => {
      console.log(err);
    });
};
