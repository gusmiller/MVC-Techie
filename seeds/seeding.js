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
const mysqlConnect = require("../config/mysqlconnection");

// fs is a Node standard library package for reading and writing files
const fs = require("fs");

exports.seedAll = async () => {

     await Category.bulkCreate(categoryData);
     messages.msg(dic.messages.categoriesseeded, null, null, 80);

     await Users.bulkCreate(userData, { individualHooks: true, returning: true, });
     messages.msg(dic.messages.userseeded, null, null, 80);

     // The fs.readFileSync() method is an inbuilt application programming interface of 
     // the fs module which is used to read the file and return its content. 
     // https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
     let postsData = fs.readFileSync("schemadata.sql", 'utf-8');

     // Import data directly from database. This uses a connection using MySQL npm package to 
     // connect database. The sql script needs to be parsed to avoid errors in syntax.
     // Important note: not all commands are supported, for example "use {database}" is not recognize
     parsedSQL = messages.parseSqlFile(postsData);

     try {
          response = await mysqlConnect.executeSQL(parsedSQL); // Import all testing posts
          messages.msg(dic.messages.postsseeded, null, null, 80);

          // Retrieve next file: testing data for comments.
          postsData = fs.readFileSync("./populateComments.sql", 'utf-8');
          parsedSQL = messages.parseSqlFile(postsData)

     } catch (error) {
          messages.msg(dic.messages.customseedingfailed + ` Error: ${error}`);
     }
};