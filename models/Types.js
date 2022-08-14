const Sequelize = require("sequelize");

const sequelize = require("../util/database");


const Types = sequelize.define("type",{
    typeId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false,
    }
})


module.exports = Types;