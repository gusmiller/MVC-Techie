/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/9/2023 7:39:28 PM
 *******************************************************************/
const { Users, Category } = require('../models');
const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const messages = require("../utils/formatter");
const dic = require("../db/queries");

exports.seedAll = async () => {

     await Category.bulkCreate(categoryData);
     messages.msg(dic.messages.categoriesseeded, null, null, 80);

     await Users.bulkCreate(userData, { individualHooks: true, returning: true, });
     messages.msg(dic.messages.userseeded, null, null, 80);

};