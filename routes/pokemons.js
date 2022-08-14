const express = require('express');

const router = express.Router();

const pokemonsController = require('../controllers/PokemonsController');

router.get("/",pokemonsController.GetPokemonsHome);
router.post("/search",pokemonsController.PostSearchedPokemon);
router.post("/filter-pokemons",pokemonsController.PostFiltredPokemons);
router.get("/admin-pokemons",pokemonsController.GetPokemonsList);
router.get("/create-pokemon", pokemonsController.GetCreatePokemons);
router.post("/create-pokemon", pokemonsController.PostCreatePokemons);
router.get("/edit-pokemon/:pokemonsId", pokemonsController.GetEditPokemons);
router.post("/edit-pokemon", pokemonsController.PostEditPokemons);
router.post("/delete-pokemon", pokemonsController.PostDeletePokemons);


module.exports = router;
