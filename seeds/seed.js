/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment # 14 Model-View-Controller (MVC)
 * Tech Blog
 * 
 * Date : 11/15/2023 5:46:58 AM
 *******************************************************************/
const sequelize = require('../config/connection');
const { Users, Category } = require('../models');
const db = require("../config/mysqlconnection")
const dic = require("../db/queries");

const messages = require("../utils/formatter");
const userData = require('./userData.json');
const categoryData = require('./categoryData.json');

var path = require("path");

// fs is a Node standard library package for reading and writing files
const fs = require("fs");

/**
 * This function will execute the SQL statement passed in parameter. The .SQL file is a UTF-8
 * type file and it needs to be read a line at the time. SQL files are MySQL scripts designed
 * to run on MySQL Workbench or any other database manager.
 * The connection is through MySQL2 npm package, not sequelizer.
 * @param {string} value - SQL Statement to execute
 * @returns true/false
 */
async function executeSQL(value) {
     const connection = await db.connectmysql(); // Get connection to database

     try {
          for (let x = 0; x <= value.length - 1; x++) {

               if (value[x].length !== 0) {
                    console.log(value[x] + `;`);
                    await connection.execute(value[x]);
               }
          }
          return true;

     } catch (error) {
          console.log(dic.messages.executefailed + ` Error: ${error.stack}`);
          return false;
     } finally {
          connection.end(); // Close the database connection when done
     }
}

// This is where the process starts it forces a database/tables regeneration (force: true), then
// it uses the data.json files which contain data array that is created in table using the bulkcCreate
// but the heavy data cannot be created in .json files; these are created using .sql files (UTF-8). But 
// these cannot be created using sequelize therefore it uses MySQL2 npm package which allows the execution
// of named queries.
const seedDatabase = async () => {
     await sequelize.sync({ force: true }); // Connect to sequelize 

     await Category.bulkCreate(categoryData);
     messages.msg(dic.messages.categoriesseeded, null, null, 80);

     await Users.bulkCreate(userData, { individualHooks: true, returning: true, });
     messages.msg(dic.messages.userseeded, null, null, 80);

     // The fs.readFileSync() method is an inbuilt application programming interface of 
     // the fs module which is used to read the file and return its content. 
     // https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
     let postsData = fs.readFileSync(path.resolve(__dirname, '../db/scripts/postdata.sql'), 'utf-8');

     // Import data directly from .sql files. This uses a connection using MySQL npm package to 
     // connect database - not the same as sequelize. We rather have the control. The sql script needs 
     // to be parsed to avoid errors in syntax.
     // Important note: not all commands are supported, for example "use {database}" is not recognize
     parsedSQL = messages.parseSqlFile(postsData);

     try {
          const response = await executeSQL(parsedSQL); // Import all testing posts
          if (response) {
               messages.msg(dic.messages.postsseeded, null, null, 80);

               // Retrieve next file: testing data for comments.
               postsData = fs.readFileSync(path.resolve(__dirname, '../db/scripts/populateComments.sql'), 'utf-8');
               parsedSQL = messages.parseSqlFile(postsData)
               await executeSQL(parsedSQL); // Import all testing comment post  
               messages.msg(dic.messages.postsseeded, null, null, 80);
          }

     } catch (error) {
          console.log(dic.messages.customseedingfailed + ` Error: ${error.stack}`);
     }
     process.exit(0);
};

seedDatabase();