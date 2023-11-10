/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const chalk = require('chalk');
const messages = require("../helpers/formatter")

const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

const seedDatabase = async () => {
     await sequelize.sync({ force: true });

     await User.bulkCreate(userData, {
          individualHooks: true,
          returning: true,
     });

     process.exit(0);
};

seedDatabase();
