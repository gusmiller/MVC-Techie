/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/28/2023 5:35:44 PM
 *******************************************************************/
const sequelize = require('../config/connection');
const { Users, Category } = require('../models');
const dic = require("../db/queries");
const messages = require("../utils/formatter");
const userData = require('./singleUser.json');

// This is where the process starts it forces a database/tables regeneration (force: true), then
// it uses the data.json files which contain data array that is created in table using the bulkcCreate
// but the heavy data cannot be created in .json files; these are created using .sql files (UTF-8). But 
// these cannot be created using sequelize therefore it uses MySQL2 npm package which allows the execution
// of named queries.
const seedDatabase = async () => {

     await Users.bulkCreate(userData, { individualHooks: true, returning: true, });
     messages.msg(dic.messages.userseeded, null, null, 80);
     process.exit(0);
};

seedDatabase();