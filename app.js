const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const sequelize = require("./util/database");
const Pokemons = require("./models/Pokemons");
const Regions = require("./models/Regions");

const errorController = require("./controllers/ErrorController");

const app = express();

const compareHelpers = require('./util/helpers/hbs/compare')

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
      equalValue: compareHelpers.EqualValue,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,"public")));

const pokemonRouter = require('./routes/pokemons');
const regionsRouter = require("./routes/regions");
const typesRouter = require("./routes/types");
const Types = require("./models/Types");

app.use(pokemonRouter);
app.use(regionsRouter);
app.use(typesRouter);

app.use(errorController.Get404);

Pokemons.belongsTo(Regions,{constraint: true,onDelete:"CASCADE"});
Regions.hasMany(Pokemons);

Pokemons.belongsTo(Types,{constraint: true,onDelete:"CASCADE"});
Types.hasMany(Pokemons);

sequelize.sync().then(result=>{
  app.listen(5002);

}).catch(err =>{
    console.log(err);
})


